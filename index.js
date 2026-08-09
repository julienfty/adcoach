// ==========================================
// SUPABASE & AUTHENTIFICATION
// ==========================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Initialisation de Supabase
const supabaseUrl = 'https://gyojzwmknilkglcywvck.supabase.co'
const supabaseAnonKey = 'sb_publishable_UoIyjRbVbUoURw4psuk68w_4t_Z4iS8'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ==========================================
// GESTION DE LA POPUP ET DES ONGLETS
// ==========================================

// Récupération des éléments
const openSignupBtn = document.getElementById('open-popup-btn')
const openLoginBtn = document.getElementById('open-login-btn')
const closeBtn = document.getElementById('close-popup-btn')
const modalOverlay = document.getElementById('modal-overlay')

const tabSignupBtn = document.getElementById('tab-signup-btn')
const tabSigninBtn = document.getElementById('tab-signin-btn')
const signupForm = document.getElementById('signup-form')
const signinForm = document.getElementById('signin-form')

// Vérification de sécurité pour voir si un ID manque dans le HTML
if (!modalOverlay || !openSignupBtn) {
  console.error("Erreur : Un des éléments principaux est introuvable dans le HTML. Vérifie tes ID !");
}

// Force la fermeture au démarrage
modalOverlay.style.display = 'none';

// Fonction pour changer d'onglet
function switchTab(mode) {
  if (mode === 'signup') {
    if (tabSignupBtn) tabSignupBtn.classList.add('active')
    if (tabSigninBtn) tabSigninBtn.classList.remove('active')
    if (signupForm) signupForm.style.display = 'flex'
    if (signinForm) signinForm.style.display = 'none'
  } else {
    if (tabSigninBtn) tabSigninBtn.classList.add('active')
    if (tabSignupBtn) tabSignupBtn.classList.remove('active')
    if (signinForm) signinForm.style.display = 'flex'
    if (signupForm) signupForm.style.display = 'none'
  }
}

// Ouvrir sur l'onglet Inscription
openSignupBtn.addEventListener('click', () => {
  switchTab('signup')
  modalOverlay.style.display = 'flex'
})

// Ouvrir sur l'onglet Connexion
if (openLoginBtn) {
  openLoginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    switchTab('signin')
    modalOverlay.style.display = 'flex'
  })
}

// Clic sur les onglets de la popup
if (tabSignupBtn) tabSignupBtn.addEventListener('click', () => switchTab('signup'))
if (tabSigninBtn) tabSigninBtn.addEventListener('click', () => switchTab('signin'))

// Fermer la popup avec la croix
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none'
  })
}

// Fermer en cliquant en dehors de la boîte
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none'
  }
})

// ==========================================
// SOUMISSION DES FORMULAIRES (SUPABASE)
// ==========================================

// 1. Gestion de l'Inscription Supabase
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      alert("Erreur d'inscription : " + error.message)
      console.error(error)
    } else {
      alert("Compte créé avec succès ! Vérifie tes emails si nécessaire.")
      console.log("Utilisateur inscrit :", data.user)
      modalOverlay.style.display = 'none'
      signupForm.reset() // Vide le formulaire
    }
  })
}

// 2. Gestion de la Connexion Supabase
if (signinForm) {
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('signin-email').value
    const password = document.getElementById('signin-password').value

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert("Erreur de connexion : " + error.message)
      console.error(error)
    } else {
      alert("Connexion réussie ! Bienvenue.")
      console.log("Utilisateur connecté :", data.user)
      modalOverlay.style.display = 'none'
      signinForm.reset() // Vide le formulaire
    }
  })
}
