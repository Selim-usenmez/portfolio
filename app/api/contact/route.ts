import { NextRequest, NextResponse } from 'next/server'

/* ── Rate limiting — max 3 requêtes / IP / 10 min ──────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT) return true

  entry.count++
  return false
}

/* ── Email validation ───────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook non configuré' }, { status: 500 })
  }

  /* ── Rate limiting ──────────────────────────────────────── */
  const ip = getIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Trop de messages. Réessaie dans 10 minutes.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  const { name, email, message, website, _t } = body

  /* ── Honeypot — les bots remplissent ce champ caché ─────── */
  if (website) {
    // Silence is golden — on fait semblant que c'est ok
    return NextResponse.json({ success: true })
  }

  /* ── Délai minimum — formulaire soumis trop vite = bot ──── */
  const loadedAt = Number(_t)
  if (!loadedAt || Date.now() - loadedAt < 3000) {
    return NextResponse.json({ success: true }) // Silence
  }

  /* ── Validation des champs ──────────────────────────────── */
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return NextResponse.json({ error: 'Données trop longues' }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
  }

  /* ── Envoi Discord ──────────────────────────────────────── */
  const discordPayload = {
    embeds: [
      {
        title: '📬 Nouveau message — Portfolio',
        color: 0x6366f1,
        fields: [
          { name: '👤 Nom', value: name.trim(), inline: true },
          { name: '📧 Email', value: email.trim(), inline: true },
          { name: '💬 Message', value: message.trim() },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: `portfolio · ${ip}` },
      },
    ],
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(discordPayload),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
