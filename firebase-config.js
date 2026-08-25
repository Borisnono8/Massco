/* ==========================================================
   CONFIGURATION FIREBASE — À REMPLIR UNE SEULE FOIS
   Remplacez les valeurs ci-dessous par celles de VOTRE projet
   Firebase (Paramètres du projet > Vos applications > SDK
   de configuration). Voir le guide fourni pour la marche à
   suivre complète.
   ========================================================== */

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  storageBucket: "VOTRE_PROJET.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

firebase.initializeApp(firebaseConfig);
