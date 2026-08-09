// ==========================================
// INSCRIPTION
// ==========================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Initialisation de Supabase
const supabaseUrl = 'https://gyojzwmknilkglcywvck.supabase.co'
const supabaseAnonKey = 'sb_publishable_UoIyjRbVbUoURw4psuk68w_4t_Z4iS8'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// --- GESTION DE LA POPUP ---
const openBtn = document.getElementById('open-popup-btn')
const closeBtn = document.getElementById('close-popup-btn')
const modalOverlay = document.getElementById('modal-overlay')

// Ouvrir
openBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'flex'
})

// Fermer
closeBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'none'
})

// Fermer autre
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none'
  }
})

// --- GESTION DE L'INSCRIPTION SUPABASE ---
const form = document.getElementById('signup-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('signup-email').value
  const password = document.getElementById('signup-password').value

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    alert("Erreur : " + error.message)
    console.error(error)
  } else {
    alert("Compte créé avec succès !")
    console.log("Utilisateur :", data.user)
    modalOverlay.style.display = 'none' // Ferme la popup après succès
  }
})
