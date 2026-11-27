# RachidiDev — Portfolio

Portfolio professionnel Next.js (App Router) pour RachidiDev, développeur web
fullstack & WordPress, spécialisé en développement web moderne.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Motion (motion-react) pour les animations
- @tabler/icons-react pour les icônes
- React Hook Form + Zod pour le formulaire de contact
- PostgreSQL hébergé sur Supabase, accessible via Prisma pour les demandes de devis
- Resend pour l'envoi des emails de notification
- Better Auth pour l'espace privé d'administration
- Prisma Postgres pour les articles et Vercel Blob pour leurs images

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
paramètres de connexion de Prisma Postgres :

\`\`\`
DATABASE_URL=
DIRECT_URL=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_ADMIN_FROM_EMAIL=
CONTACT_EMAIL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=https://rachididev.site
ADMIN_EMAIL=contact@rachididev.site
BLOB_READ_WRITE_TOKEN=
\`\`\`

**Ne commitez jamais vos vraies clés.**

Pour créer `BETTER_AUTH_SECRET`, générez une valeur aléatoire longue (par
exemple avec `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`).
Configurez les mêmes variables dans l’environnement local et dans les paramètres
Vercel du projet. `BLOB_READ_WRITE_TOKEN` est fourni par le store Vercel Blob.

## Base de données PostgreSQL et Prisma

Prisma Postgres héberge la base PostgreSQL et Prisma ORM est utilisé côté
serveur. Le modèle `QuoteRequest` de `prisma/schema.prisma` correspond à la
table `public.quote_requests`.

Dans Prisma Console, ouvrez la base et sélectionnez **Connect to your
database**. Renseignez `DATABASE_URL` avec l'URL poolée (`pooled.db.prisma.io`)
pour l'application et `DIRECT_URL` avec l'URL directe (`db.prisma.io`) pour les
commandes Prisma. Placez les URL dans `.env.local` à la racine du projet. Pour
Resend, renseignez `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL` et
`RESEND_ADMIN_FROM_EMAIL`. Utilisez par exemple
`RachidiDev <contact@rachididev.site>` comme expéditeur des confirmations client
et `RachidiDev Notifications <notifications@rachididev.site>` pour les
notifications administrateur. Les deux adresses d’expédition doivent utiliser
un domaine vérifié dans Resend; `CONTACT_EMAIL` est l’adresse qui reçoit les
demandes. Pour le domaine d’envoi, configurez aussi un enregistrement DNS TXT
`_dmarc` avec la valeur `v=DMARC1; p=none;` (si un enregistrement DMARC existe
déjà, modifiez-le au lieu d’en créer un second). Cette politique de suivi permet
de commencer à vérifier l’authentification sans demander aux serveurs de
supprimer ou de rejeter les messages. La commande `pnpm db:push` charge ce fichier
explicitement, car Prisma CLI ne lit pas `.env.local` par défaut. Next.js le
charge aussi. Ne partagez pas ces URL et ne les commitez pas. Après avoir
configuré les URL,
exécutez `pnpm db:push` une première fois pour créer ou synchroniser la table,
puis `pnpm db:generate` si le client Prisma doit être régénéré.
Après un envoi accepté, vérifiez l’événement correspondant dans **Resend →
Emails** : l’acceptation par l’API ne garantit pas la livraison en boîte de
réception. Les identifiants des e-mails acceptés sont également consignés dans
les logs de fonctions Vercel.
Les anciennes clés `NEXT_PUBLIC_SUPABASE_*` et `SUPABASE_SERVICE_ROLE_KEY` ne
sont plus utilisées par l'application.

## Tableau de bord éditorial

L’espace privé est accessible à l’adresse `/admin`. Connectez-vous avec
`contact@rachididev.site`; l’inscription publique est désactivée. Pour créer le
compte administrateur initial sans définir de mot de passe dans le code ou dans
la configuration, après avoir configuré la base et appliqué le schéma :

\`\`\`bash
pnpm db:push
pnpm db:generate
pnpm dlx auth@latest create-admin --email contact@rachididev.site --name "RachidiDev" --role admin
\`\`\`

La commande demande le mot de passe de façon interactive si l’option
`--password` est omise. Utilisez ensuite `/admin` pour créer, modifier,
enregistrer comme brouillon, publier ou supprimer des articles. Les articles
historiques du blog apparaissent également dans la liste et peuvent être
modifiés. Les images téléversées depuis l’éditeur sont stockées dans Vercel
Blob; configurez son token avant d’utiliser cette fonctionnalité.
Depuis l’écran de connexion, **Mot de passe oublié ?** envoie un lien de
réinitialisation à l’adresse du compte via Resend. Configurez
`RESEND_API_KEY`, `RESEND_FROM_EMAIL` et `BETTER_AUTH_URL` en local et dans
Vercel. Le lien révoque les sessions existantes après modification du mot de
passe.

## Contenu à personnaliser

- `data/projects.ts` — vos projets (remplacez les images placeholder dans
  `public/images/projects/`)
- `data/services.ts` — vos services
- `data/skills.ts` — vos compétences
- `data/socials.ts` — vos liens sociaux et coordonnées
- `data/timeline.ts` — votre parcours professionnel
- `/admin` — création et gestion des articles du blog
- `data/blog.ts` — articles historiques intégrés au blog et conservés comme
  contenu initial modifiable dans le tableau de bord
- `public/images/blog/` — les images de couverture du blog. Ajoutez-y une image
  puis renseignez son chemin, par exemple `/images/blog/mon-article.webp`, dans
  `coverImage` et son texte alternatif dans `coverAlt` dans `data/blog.ts`.
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
