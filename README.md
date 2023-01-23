[Cupizator]
 
L'application permet à un utilisateur de créer un groupe d'amis en invitant des personnes par mail. 
Le but de l'application est de permettre aux utilisateurs de se défier en faisant des pronostics sur des compétitions, comme la Coupe du monde par exemple. 
Les utilisateurs peuvent parier sur les résultats des matches (gagnant, perdant ou nul) et leur classement dans le groupe est automatiquement mis à jour en fonction de leurs résultats. 
Les utilisateurs peuvent également modifier leurs pronostics avant le début des matches. Le créateur du groupe peut également décider d'ajouter un pot d'entrée pour les joueurs, et le gagnant remporte le pot. 
Les groupes peuvent avoir un nom. De nouvelles fonctionnalités pourront être ajoutées plus tard, comme la possibilité de cash-out avant la fin d'un match ou de parier sur des éléments spécifiques de la partie.

[Fonctionnalités]

- Inscription
- Connexion
- Créer un groupe de parie

_ Inviter a un groupe
_ Rejoindre un groupe
_ Parier sur un match (equipe gagnante)
_ Parier sur un score exact
_ Consulter la côte d'un match
_ Gagner et consulter des points
_ Mettre en place une cagnotte
_ Pouvoir récupérer des gain
_ Modifier les informations perso

[Installation]

Ceci est un projet Next.js bootstrap avec create-next-app.

Pour commencer

Tout d'abord, lancez le serveur de développement:


```bash
docker-compose up
```

```bash
yarn install
#ou
npm install -g prisma
```

```bash
prisma db push
```

```bash
npm run dev
# or
yarn dev
```

Ouvrez http://localhost:3000 avec votre navigateur pour voir le résultat.

Vous pouvez commencer à éditer la page en modifiant pages/index.js. La page se met à jour automatiquement lorsque vous modifiez le fichier.

Les routes d'API peuvent être accessibles à http://localhost:3000/api/hello. Cet endpoint peut être édité dans pages/api/hello.js.

Le répertoire pages/api est mappé à /api/*. Les fichiers de ce répertoire sont traités comme des routes d'API plutôt que des pages React.

```

[En savoir plus]

Pour en savoir plus sur Next.js, consultez les ressources suivantes :

[Next.js Documentation](https://nextjs.org/docs) - découvrez les fonctionnalités et l'API de Next.js.
[Learn Next.js](https://nextjs.org/learn) - un tutoriel interactif de Next.js.
Vous pouvez également consulter le dépôt GitHub de Next.js - vos commentaires et contributions sont les bienvenus !

##Déploiement sur Vercel

La méthode la plus simple pour déployer votre application Next.js est d'utiliser la plateforme Vercel créée par les développeurs de Next.js.

Consultez notre documentation de déploiement de Next.js pour plus de détails.
