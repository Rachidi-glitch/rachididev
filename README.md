# RachidiDev — Portfolio

Portfolio professionnel Next.js (App Router) pour un développeur Fullstack
freelance spécialisé WordPress et développement web moderne.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Motion (motion-react) pour les animations
- @tabler/icons-react pour les icônes
- React Hook Form + Zod pour le formulaire de contact
- PostgreSQL hébergé sur Supabase, accessible via Prisma pour les demandes de devis
- Resend pour l'envoi des emails de notification

## Démarrage

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

Le site est disponible sur http://localhost:3000
Le serveur de développement utilise Webpack afin d'éviter le plantage interne
de Turbopack rencontré sur cet environnement Windows.

## Variables d'environnement

Copiez `.env.example` vers `.env` et renseignez vos variables. Prisma CLI et
Next.js chargeront ces paramètres. Les URL PostgreSQL se récupèrent dans les
paramètres de connexion Supabase :

\`\`\`
DATABASE_URL=
DIRECT_URL=
RESEND_API_KEY=
CONTACT_EMAIL=
\`\`\`

**Ne commitez jamais vos vraies clés.**

## Base de données PostgreSQL et Prisma

Supabase héberge toujours la base PostgreSQL ; Prisma est utilisé comme ORM
côté serveur. Le modèle `QuoteRequest` de `prisma/schema.prisma` correspond à
la table `public.quote_requests`.

Renseignez `DATABASE_URL` avec l'URL de connexion poolée de Supabase et
`DIRECT_URL` avec l'URL directe de la base. Prisma CLI lit le fichier `.env` à
la racine du projet; Next.js lit aussi `.env.local`. Renseignez les deux URL
dans `.env` pour les commandes Prisma et dans `.env.local` pour l'application.
Ne partagez pas ces URL et ne les commitez pas. Après avoir configuré les URL,
exécutez `pnpm db:push` une première fois pour créer ou synchroniser la table,
puis `pnpm db:generate` si le client Prisma doit être régénéré.
Les anciennes clés `NEXT_PUBLIC_SUPABASE_*` et `SUPABASE_SERVICE_ROLE_KEY` ne
sont plus utilisées par l'application.

## Contenu à personnaliser

- `data/projects.ts` — vos projets (remplacez les images placeholder dans
  `public/images/projects/`)
- `data/services.ts` — vos services
- `data/skills.ts` — vos compétences
- `data/socials.ts` — vos liens sociaux et coordonnées
- `data/timeline.ts` — votre parcours professionnel
- `public/cv/rachididev-cv.pdf` — CV téléchargeable, rédigé à partir du profil et du contenu du portfolio

## Scripts

\`\`\`bash
pnpm dev      # démarrage en développement
pnpm build    # build de production
pnpm start    # démarrage en production
pnpm lint     # vérification ESLint
pnpm db:generate  # génération du client Prisma
\`\`\`

## Déploiement

Le projet est prêt pour un déploiement sur Vercel. Pensez à renseigner les
variables d'environnement dans les paramètres du projet Vercel.
