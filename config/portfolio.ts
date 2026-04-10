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
    'Futur Ingénieur IA',
  ],
  tagline: 'Passionné par le développement et les nouvelles technologies, je vise à devenir ingénieur en intelligence artificielle.',
  email: 'selim.usenmez@gmail.com',
  location: 'Lyon, France',
  school: 'Institution Les Chartreux, Lyon',
  availableForWork: true,
  cvPath: '/assets/cv/CV_Usenmez_Selim_1745076542.pdf',
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
      periode: '2023–2025',
      diplome: 'BTS SIO SLAM',
      etablissement: 'Institution Les Chartreux, Lyon',
      current: true,
    },
    {
      periode: '2022–2023',
      diplome: 'Bac Pro SN RISC',
      etablissement: 'École La Mache, Lyon',
      current: false,
    },
    {
      periode: '2020–2022',
      diplome: '1ère et 2nde SN RISC',
      etablissement: 'École La Mache, Lyon',
      current: false,
    },
  ],
  experiences: [
    {
      periode: 'Mai – Juin 2024',
      poste: 'Stage — ABD Réseaux, Vénissieux',
      missions: ['Fibre optique : raccordement maison, dépannage'],
      color: 'from-indigo-400 to-purple-400',
    },
    {
      periode: 'Juin – Juil. 2023',
      poste: 'Stage — ABD Réseaux, Vénissieux',
      missions: ['Fibre optique : dépannage, raccordement'],
      color: 'from-cyan-400 to-blue-400',
    },
    {
      periode: 'Mai – Juin 2023',
      poste: 'Stage — Slyatech, Vénissieux',
      missions: ['Plan informatique, serveurs (HaneDan), PIG Vision'],
      color: 'from-emerald-400 to-teal-400',
    },
    {
      periode: '2020',
      poste: 'Maxi Market, Saint-Fons',
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
    title: 'Formulaire de Contrat Web',
    subtitle: 'Application Web — Formation',
    description: 'Création d\'un formulaire de contrat avec base de données. Gestion complète des données via HTML, CSS, PHP et JavaScript.',
    tags: ['HTML', 'CSS', 'PHP', 'JavaScript', 'MySQL'],
    color: 'from-indigo-500/20 to-purple-500/20',
    accent: '#818cf8',
    preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
    github: '#',
    competence: 'Gérer le SI',
  },
  {
    id: 2,
    title: 'Beyond Bliss',
    subtitle: 'Présence en Ligne — Formation',
    description: 'TP Développement de présence en ligne pour la marque Beyond Bliss. Intégration responsive et design moderne.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    color: 'from-cyan-500/20 to-blue-500/20',
    accent: '#22d3ee',
    preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
    github: '#',
    competence: 'Développement Web',
  },
  {
    id: 3,
    title: 'Portfolio Docker',
    subtitle: 'Déploiement — Formation',
    description: 'Portfolio personnel full stack dockerisé avec architecture MVC en PHP. Déploiement containerisé via Docker Compose.',
    tags: ['PHP', 'Docker', 'MVC', 'MySQL', 'Nginx'],
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#34d399',
    preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
    github: 'https://github.com/Selim-usenmez/portfolio-docker',
    competence: 'Déploiement',
  },
  {
    id: 4,
    title: 'Installation Fibre Optique',
    subtitle: 'Projet — Milieu professionnel',
    description: 'Raccordement et dépannage fibre optique en milieu professionnel chez ABD Réseaux (Vénissieux). Gestion de projet terrain.',
    tags: ['Fibre Optique', 'Réseaux', 'Terrain', 'Technique'],
    color: 'from-pink-500/20 to-rose-500/20',
    accent: '#f472b6',
    preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
    github: '#',
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
          preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
        },
        {
          nom: 'TP Dev Présence en Ligne (Beyond Bliss)',
          competences: { gerer_si: false, incidents: false, web: true, projet: false, deploiement: false, dev_pro: false },
          preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
        },
        {
          nom: 'Resapli',
          competences: { gerer_si: false, incidents: true, web: false, projet: false, deploiement: false, dev_pro: false },
          preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
        },
        {
          nom: 'Projet Portfolio',
          competences: { gerer_si: false, incidents: false, web: false, projet: false, deploiement: true, dev_pro: false },
          preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
        },
        {
          nom: 'Projet personnel (certification)',
          competences: { gerer_si: false, incidents: false, web: false, projet: false, deploiement: false, dev_pro: true },
          preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
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
          preuve: '/assets/docs/E5-Tableaudesynthese.pdf',
        },
      ],
    },
    {
      title: 'Réalisations en milieu professionnel — 2e année',
      icon: '🏁',
      pending: true,
      projects: [],
    },
  ],
  pdfPath: '/assets/docs/E5-Tableaudesynthese.pdf',
  xlsxPath: '/assets/docs/E5-Tableaudesynthese.xlsx',
}

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Selim-usenmez', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/selim-usenmez', icon: 'linkedin' },
]
