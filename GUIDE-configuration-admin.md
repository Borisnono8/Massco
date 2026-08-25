# Guide de configuration — Espace collaborateur MASSCO

Ce guide explique comment activer l'espace collaborateur (`admin.html`) qui permet de publier des annonces visibles instantanément sur le site. Cela prend environ 15 minutes, une seule fois.

## 1. Créer un projet Firebase (gratuit)

1. Allez sur https://console.firebase.google.com
2. Connectez-vous avec un compte Google (créez-en un si besoin)
3. Cliquez sur **Ajouter un projet**, nommez-le par exemple `massco-site`, terminez la création (le plan gratuit "Spark" suffit largement)

## 2. Récupérer la configuration et la coller dans le code

1. Dans le tableau de bord du projet, cliquez sur l'icône **</>** (Web) pour ajouter une application web
2. Donnez-lui un nom (ex : `massco-site-web`), cliquez sur **Enregistrer l'application**
3. Firebase affiche un bloc `firebaseConfig = { apiKey: ..., authDomain: ..., ... }`
4. Copiez ces valeurs dans le fichier **`firebase-config.js`** fourni, à la place de `VOTRE_API_KEY`, `VOTRE_PROJET`, etc.

## 3. Activer la connexion par e-mail / mot de passe

1. Dans le menu de gauche : **Authentication** → **Get started**
2. Onglet **Sign-in method** → activez **E-mail/Mot de passe**

## 4. Créer les comptes (vous + votre collaborateur)

1. Toujours dans **Authentication** → onglet **Users** → **Add user**
2. Créez un compte pour vous (votre e-mail + un mot de passe)
3. Créez un compte pour votre collaborateur (son e-mail + un mot de passe que vous lui communiquez)
4. Ce sont ces identifiants qui permettent de se connecter sur `admin.html` — il n'y a pas d'inscription publique, seuls les comptes que vous créez ici fonctionnent

## 5. Activer la base de données (Firestore)

1. Menu de gauche : **Firestore Database** → **Créer une base de données**
2. Choisissez **Mode production**, puis une région proche (ex : `eur3` ou `europe-west`)
3. Une fois créée, allez dans l'onglet **Règles** et remplacez tout le contenu par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /annonces/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Cliquez sur **Publier**

Ces règles veulent dire : tout le monde peut **voir** les annonces, mais seule une personne **connectée** (vous ou votre collaborateur) peut en ajouter ou supprimer.

## 6. Activer le stockage des photos (Storage)

1. Menu de gauche : **Storage** → **Commencer**
2. Suivez les étapes par défaut
3. Onglet **Règles**, remplacez par :

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /annonces/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Cliquez sur **Publier**

## 7. Mettre les fichiers en ligne

Déposez ces fichiers ensemble, au même niveau, chez votre hébergeur :

```
massco.html
admin.html
firebase-config.js   (rempli avec vos vraies valeurs)
logo.png
images/  (toutes vos photos)
```

## 8. Tester

1. Ouvrez `admin.html`, connectez-vous avec le compte créé à l'étape 4
2. Publiez une annonce test avec une photo
3. Ouvrez `massco.html` → l'annonce doit apparaître dans la section **Annonces**, immédiatement

## Bon à savoir

- Le plan gratuit Firebase (Spark) inclut largement de quoi faire tourner ce site (1 Go de stockage, 50 000 lectures/jour) — aucun frais à prévoir sauf trafic très important
- Si votre collaborateur oublie son mot de passe, allez dans **Authentication → Users**, cliquez sur son compte, puis **Réinitialiser le mot de passe**
- Pour révoquer l'accès d'un collaborateur, supprimez simplement son compte dans **Authentication → Users**
