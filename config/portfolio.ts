// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT CONFIGURATION — Selim Usenmez
//  Modifie ce fichier pour mettre à jour tout le contenu.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Selim Usenmez',
  role: 'Étudiant BTS SIO SLAM',
  roles: [
    'Développeur Web Full Stack',
    'Étudiant BTS SIO SLAM',
    'Passionné d\'IA & Technologies',
    'Futur Ingénieur en Développement Logiciel & IA',
  ],
  tagline: 'Étudiant en BTS SIO SLAM, souhaitant intégrer CPE Lyon afin de devenir ingénieur en développement logiciel et intelligence artificielle.',
  email: 'usenmezselim@gmail.com',
  location: 'Lyon, France',
  school: 'Institution Les Chartreux, Lyon',
  availableForWork: true,
  cvPath: '/assets/cv/CV_Usenmez_Selim_2026.pdf',
}

export const aboutConfig = {
  bio: [
    "Je m'appelle Selim Usenmez, j'ai 19 ans et je suis actuellement en BTS SIO option SLAM à l'Institution Les Chartreux à Lyon.",
    "Passionné par le développement et les nouvelles technologies, j'ai pour objectif de devenir ingénieur en intelligence artificielle.",
  ],
  stats: [
    { value: '19', label: 'Ans' },
    { value: '2+', label: 'Ans d\'expérience' },
    { value: '5+', label: 'Projets réalisés' },
    { value: '2', label: 'Langues parlées' },
  ],
  formations: [
    {
      periode: '2023–2026',
      diplome: 'BTS SIO SLAM',
      etablissement: 'Sup Alta Les Chartreux, Lyon',
      current: true,
    },
    {
      periode: '2022–2023',
      diplome: 'Terminale Pro Système Numérique RISC',
      etablissement: 'École La Mache, Lyon',
      current: false,
    },
    {
      periode: '2021–2022',
      diplome: '1ère Pro Système Numérique RISC',
      etablissement: 'École La Mache, Lyon',
      current: false,
    },
    {
      periode: '2020–2021',
      diplome: '2nde Pro Système Numérique RISC',
      etablissement: 'École La Mache, Lyon',
      current: false,
    },
  ],
  experiences: [
    {
      periode: 'Fév. – Avr. 2026',
      poste: 'Stage Développeur Web — Kalitys, Villeurbanne',
      missions: ['Création et modification de pages web', 'Tests, correction de bugs et amélioration de fonctionnalités'],
      color: 'from-violet-400 to-indigo-400',
    },
    {
      periode: 'Juin – Juil. 2024',
      poste: 'Stage — ABD Réseaux, Vénissieux',
      missions: ['Fibre optique : raccordement maison, dépannage'],
      color: 'from-indigo-400 to-purple-400',
    },
    {
      periode: 'Mai – Juin 2023',
      poste: 'Stage — ABD Réseaux, Vénissieux',
      missions: ['Fibre optique : raccordement maison, dépannage'],
      color: 'from-cyan-400 to-blue-400',
    },
    {
      periode: 'Mai – Juin 2022',
      poste: 'Stage — Sylatech, Vénissieux',
      missions: ['Fibre optique : raccordement maison, dépannage'],
      color: 'from-emerald-400 to-teal-400',
    },
    {
      periode: 'Mars 2021',
      poste: 'Stage — Sylatech, Vénissieux',
      missions: ['Fibre optique : raccordement maison, dépannage'],
      color: 'from-amber-400 to-orange-400',
    },
    {
      periode: 'Mars 2020',
      poste: 'Stage — Maxi Market, Saint-Fons',
      missions: ['Vente, mise en rayon'],
      color: 'from-pink-400 to-rose-400',
    },
  ],
  langues: [
    { langue: 'Turc', niveau: 'Bilingue', flag: '🇹🇷', pct: 100 },
    { langue: 'Français', niveau: 'Courant', flag: '🇫🇷', pct: 98 },
    { langue: 'Anglais', niveau: 'Intermédiaire B2', flag: '🇬🇧', pct: 65 },
  ],
  loisirs: [
    { label: 'Basket', detail: '5 ans', icon: '🏀' },
    { label: 'Fitness / Musculation', detail: '', icon: '🏋️' },
    { label: 'Football américain', detail: '', icon: '🏈' },
    { label: 'Badminton', detail: '', icon: '🏸' },
  ],
  voyages: [
    { pays: 'Turquie', flag: '🇹🇷' },
    { pays: 'Bulgarie', flag: '🇧🇬' },
    { pays: 'Croatie', flag: '🇭🇷' },
    { pays: 'Italie', flag: '🇮🇹' },
    { pays: 'Espagne', flag: '🇪🇸' },
    { pays: 'Grèce', flag: '🇬🇷' },
  ],
}

export const skillsConfig = {
  categories: [
    {
      name: 'Développement Web',
      color: 'from-indigo-400 to-purple-400',
      icon: '🌐',
      items: [
        { name: 'HTML5 / CSS3', pct: 90, desc: 'Maîtrise avancée, Grid, Flexbox, animations' },
        { name: 'JavaScript', pct: 85, desc: 'ES6+, manipulation DOM, AJAX, événements' },
        { name: 'PHP', pct: 80, desc: 'POO, MVC, sessions, cookies, formulaires' },
      ],
    },
    {
      name: 'Bases de Données',
      color: 'from-cyan-400 to-blue-400',
      icon: '🗄️',
      items: [
        { name: 'MySQL', pct: 85, desc: 'Requêtes complexes, jointures, optimisation' },
        { name: 'PDO', pct: 80, desc: 'Connexions sécurisées, requêtes préparées' },
      ],
    },
    {
      name: 'Outils & DevOps',
      color: 'from-emerald-400 to-teal-400',
      icon: '🛠️',
      items: [
        { name: 'Git / GitHub', pct: 75, desc: 'Versioning, branches, collaboration en équipe' },
        { name: 'Docker', pct: 70, desc: 'Containerisation, Docker Compose, déploiement' },
        { name: 'Linux', pct: 65, desc: 'Administration système, CLI, scripts bash' },
      ],
    },
    {
      name: 'Programmation',
      color: 'from-pink-400 to-rose-400',
      icon: '💻',
      items: [
        { name: 'C#', pct: 70, desc: 'POO, .NET Framework, applications console' },
        { name: 'Python', pct: 65, desc: 'Scripts d\'automatisation, traitement de données' },
      ],
    },
    {
      name: 'Intelligence Artificielle',
      color: 'from-amber-400 to-orange-400',
      icon: '🤖',
      items: [
        { name: 'Machine Learning', pct: 45, desc: 'Algorithmes de base, sklearn, pandas, numpy' },
        { name: 'Chatbots / API IA', pct: 60, desc: 'Intégration d\'APIs IA, assistants conversationnels' },
      ],
    },
  ],
}

export const projectsConfig = [
  {
    id: 1,
    title: 'PPE1 — EPI (Nexus)',
    subtitle: 'Client Léger — PPE1',
    description: 'Application web de gestion interne (client léger) développée en PHP/MVC. Gestion des employés, des accès et des ressources de l\'entreprise fictive Nexus.',
    tags: ['PHP', 'MVC', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    color: 'from-indigo-500/20 to-purple-500/20',
    accent: '#818cf8',
    preuve: null,
    github: 'https://github.com/Selim-usenmez/EPI',
    demo: {
      url: 'https://likeus.dev',
      credentials: [
        { role: 'Employé', login: 'user@nexus.test', password: 'Azerty123!' },
      ],
    },
    competence: 'Développement Web',
  },
  {
    id: 2,
    title: 'Beyond Bliss',
    subtitle: 'Présence en Ligne — TP WordPress',
    description: 'TP de développement de présence en ligne pour la marque Beyond Bliss. Création d\'un site WordPress avec personnalisation thème, intégration contenu et SEO de base.',
    tags: ['WordPress', 'CSS', 'SEO', 'Responsive'],
    color: 'from-cyan-500/20 to-blue-500/20',
    accent: '#22d3ee',
    preuve: null,
    github: '#',
    demo: null,
    competence: 'Développement Web',
  },
  {
    id: 3,
    title: 'Portfolio Docker',
    subtitle: 'Déploiement — Formation',
    description: 'Portfolio personnel full stack dockerisé avec architecture MVC en PHP. Déploiement containerisé via Docker Compose, reverse proxy Nginx.',
    tags: ['PHP', 'Docker', 'MVC', 'MySQL', 'Nginx'],
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#34d399',
    preuve: null,
    github: 'https://github.com/Selim-usenmez/portfolio-docker',
    demo: null,
    competence: 'Déploiement',
  },
  {
    id: 4,
    title: 'NexusSport',
    subtitle: 'Client Mobile — PPE2',
    description: 'Application iOS native développée en Swift. Gestion sportive connectée avec authentification, suivi des performances et données en temps réel via Supabase.',
    tags: ['Swift', 'iOS', 'Supabase', 'Xcode', 'TestFlight'],
    color: 'from-orange-500/20 to-amber-500/20',
    accent: '#fb923c',
    preuve: null,
    github: 'https://github.com/Selim-usenmez/PPE_Client_Mobile',
    demo: null,
    mobile: {
      platform: 'iOS',
      testflight: null, // Ajoute ton lien TestFlight ici quand disponible
    },
    competence: 'Développement Mobile',
  },
  {
    id: 5,
    title: 'Installation Fibre Optique',
    subtitle: 'Stage — ABD Réseaux, Vénissieux',
    description: 'Raccordement et dépannage fibre optique en milieu professionnel chez ABD Réseaux. Installation chez les particuliers, gestion des incidents réseau.',
    tags: ['Fibre Optique', 'Réseaux', 'FTTH', 'Terrain'],
    color: 'from-pink-500/20 to-rose-500/20',
    accent: '#f472b6',
    preuve: null,
    github: '#',
    demo: null,
    competence: 'Gestion de projet',
  },
]

// ── Tableau de synthèse E5 ────────────────────────────────────
export const tableauSyntheseConfig = {
  competenceHeaders: [
    { key: 'gerer_si', label: 'Gérer le SI' },
    { key: 'incidents', label: 'Incidents' },
    { key: 'web', label: 'Web' },
    { key: 'projet', label: 'Projet' },
    { key: 'deploiement', label: 'Déploiement' },
    { key: 'dev_pro', label: 'Dév. pro' },
  ],
  sections: [
    {
      title: 'Réalisations en cours de formation',
      icon: '📘',
      projects: [
        {
          nom: 'Formulaire de contrat web',
          competences: { gerer_si: true, incidents: false, web: false, projet: false, deploiement: false, dev_pro: false },
          preuve: '/assets/docs/preuve1gerersi.pdf',
        },
        {
          nom: 'TP Dev Présence en Ligne (BeyondBliss)',
          competences: { gerer_si: false, incidents: false, web: true, projet: false, deploiement: false, dev_pro: false },
          preuve: '/assets/docs/preuve2web.pdf',
        },
        {
          nom: 'Resapli',
          competences: { gerer_si: false, incidents: true, web: false, projet: false, deploiement: false, dev_pro: false },
          preuve: '/assets/docs/preuve4incident.pdf',
        },
        {
          nom: 'Projet Mobile (NexusSport)',
          competences: { gerer_si: false, incidents: false, web: false, projet: false, deploiement: true, dev_pro: false },
          preuve: null,
        },
        {
          nom: 'Projet web (NexusPharm)',
          competences: { gerer_si: false, incidents: false, web: false, projet: false, deploiement: false, dev_pro: true },
          preuve: null,
        },
      ],
    },
    {
      title: 'Réalisations en milieu professionnel — 1ère année',
      icon: '🛠',
      projects: [
        {
          nom: 'Installation fibre optique',
          competences: { gerer_si: false, incidents: false, web: false, projet: true, deploiement: false, dev_pro: false },
          preuve: '/assets/docs/preuvesurprojet.pdf',
        },
      ],
    },
    {
      title: 'Réalisations en milieu professionnel — 2e année',
      icon: '🏁',
      projects: [
        {
          nom: 'Projet notice rouge Kalitys',
          competences: { gerer_si: false, incidents: false, web: false, projet: true, deploiement: false, dev_pro: false },
          preuve: null,
        },
        {
          nom: 'Améliorer le ranking d\'un client (positionnement)',
          competences: { gerer_si: false, incidents: false, web: true, projet: false, deploiement: false, dev_pro: false },
          preuve: null,
        },
      ],
    },
  ],
  pdfPath: '/assets/docs/E5-Tableaudesynthese4.pdf',
  xlsxPath: '/assets/docs/E5-Tableaudesynthese4.xlsx',
}

export const certificationsConfig = [
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    year: '2024',
    color: 'from-blue-400 to-cyan-400',
    accent: '#22d3ee',
    url: '#',
  },
  {
    name: 'Introduction to IoT',
    issuer: 'Cisco',
    year: '2024',
    color: 'from-indigo-400 to-blue-400',
    accent: '#818cf8',
    url: '#',
  },
  {
    name: 'Développeur Web',
    issuer: 'OpenClassrooms',
    year: '2023',
    color: 'from-purple-400 to-pink-400',
    accent: '#c084fc',
    url: '#',
  },
  {
    name: 'Git & GitHub',
    issuer: 'OpenClassrooms',
    year: '2023',
    color: 'from-emerald-400 to-teal-400',
    accent: '#34d399',
    url: '#',
  },
]

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Selim-usenmez', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/selim-usenmez', icon: 'linkedin' },
]
