```markdown
# Online Library API

## Contexte

Ce projet implémente une API REST pour une bibliothèque en ligne avec des fonctionnalités avancées. L'API permet de gérer les livres, les utilisateurs, l'authentification, l'ajout de notes et de commentaires sur les livres, ainsi que des fonctionnalités de recherche et de tri avancées.

## Fonctionnalités

### 1. Gestion des livres (CRUD avancé)
- Chaque livre possède les propriétés suivantes :
  - `title` (string, obligatoire)
  - `author` (string, obligatoire)
  - `publishedDate` (date, facultatif)
  - `category` (string, facultatif)
  - `rating` (number, calculé automatiquement comme la moyenne des notes)
  - `reviews` (array de commentaires associés)

  **Endpoints disponibles :**
  - `GET /books/top-rated` : Récupère les livres les mieux notés, triés par note décroissante (limite configurable, par défaut top 5).

### 2. Authentification et gestion des utilisateurs
- Création et connexion d’utilisateur :
  - `POST /auth/register` : Permet à un utilisateur de s’enregistrer avec un email et un mot de passe.
  - `POST /auth/login` : Retourne un JWT après la vérification des identifiants.
- Toutes les routes de l’API sont protégées par un guard JWT, sauf `/auth/register` et `/auth/login`.

### 3. Ajout de notes et commentaires
- Un utilisateur authentifié peut ajouter une note (entre 1 et 5) et un commentaire sur un livre via :
  - `POST /books/:id/review` : Ajouter une note et un commentaire pour un livre.
  - Chaque commentaire doit inclure :
    - `comment` (string, obligatoire)
    - `rating` (number, obligatoire, entre 1 et 5)
    - `userId` (id de l’utilisateur)
    - `createdAt` (date automatique)
- Un utilisateur ne peut pas noter un livre plus d’une fois.

### 4. Recherche avancée de livres
- `GET /books/search` : Recherche avancée de livres par titre, auteur ou catégorie.
  - Paramètres de recherche :
    - `title` (optionnel)
    - `author` (optionnel)
    - `category` (optionnel)
  - Tri des résultats par `publishedDate` ou `rating` (ordre croissant ou décroissant).

### 5. Gestion des erreurs
- Messages d’erreur détaillés et structurés pour :
  - Authentification échouée
  - Données invalides
  - Livre ou utilisateur introuvable
  - Conflits (par exemple, tentative de noter un livre plusieurs fois)

### 6. Documentation et tests
- Documentation Swagger disponible à l'adresse : `/api/docs`.
- Tests unitaires pour :
  - L’enregistrement d’un utilisateur
  - La création d’un livre
  - L’ajout d’une note et d’un commentaire

## Installation

### Prérequis
- Node.js (version >= 14.x)
- MongoDB (local ou via un service externe)
- Git

### Étapes d'installation

1. Clonez le dépôt GitHub :

   ```bash
   git clone https://github.com/ModouDiagne/online-library-api.git
   cd online-library-api
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez votre environnement. Renommez le fichier `.env.example` en `.env` et remplissez les variables d'environnement :
   - `MONGO_URI` : URI de votre base de données MongoDB
   - `JWT_SECRET` : Clé secrète pour signer les JWT

4. Démarrez l'API en mode développement :

   ```bash
   npm run start:dev
   ```

   L'API sera accessible à l'adresse `http://localhost:3000`.

## Tests

### Tests unitaires

Lancez les tests unitaires pour vérifier que l'application fonctionne comme prévu.

```bash
npm run test
```

### Tests d'API

Utilisez des outils comme Postman ou Insomnia pour tester les différentes routes de l'API :

1. **Enregistrement d'un utilisateur :**
   - Méthode : `POST`
   - URL : `/auth/register`
   - Corps :
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```

2. **Connexion d'un utilisateur :**
   - Méthode : `POST`
   - URL : `/auth/login`
   - Corps :
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - Réponse : Vous recevrez un JWT à inclure dans les en-têtes `Authorization` pour accéder aux autres routes protégées.

3. **Création d'un livre :**
   - Méthode : `POST`
   - URL : `/books`
   - Corps :
     ```json
     {
       "title": "Titre du livre",
       "author": "Auteur du livre",
       "publishedDate": "2021-01-01",
       "category": "Catégorie"
     }
     ```

4. **Ajouter une note/commentaire :**
   - Méthode : `POST`
   - URL : `/books/:id/review`
   - Corps :
     ```json
     {
       "comment": "Excellente lecture!",
       "rating": 5,
       "userId": "ID_UTILISATEUR"
     }
     ```

5. **Rechercher des livres :**
   - Méthode : `GET`
   - URL : `/books/search?title=livre&author=auteur&category=catégorie&sort=rating&order=desc`

## Documentation Swagger

L'API expose une documentation Swagger accessible à l'adresse suivante :  
`http://localhost:3000/api/docs`

## Structure du Projet

Le projet est structuré de manière modulaire avec les composants suivants :
- **Modules** : Gestion des livres, des utilisateurs, de l'authentification, etc.
- **Services** : Logique métier pour chaque fonctionnalité.
- **Contrôleurs** : Routes et gestion des requêtes HTTP.
- **Guards** : Protection des routes avec JWT.
- **Filtres d'exception** : Gestion des erreurs globales.

## Conclusion

Ce projet implémente une API REST complète avec NestJS, MongoDB et Mongoose. Il permet de gérer une bibliothèque en ligne avec des fonctionnalités avancées telles que l'authentification, la gestion des livres, l'ajout de commentaires et de notes, ainsi qu'une recherche avancée. Des tests unitaires et une documentation Swagger sont inclus pour assurer la qualité et la clarté du code.

## Auteur
Modou Diagne - 2025
```
