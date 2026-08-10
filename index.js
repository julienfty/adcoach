import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://gyojzwmknilkglcywvck.supabase.co'
const supabaseAnonKey = 'sb_publishable_UoIyjRbVbUoURw4psuk68w_4t_Z4iS8'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const openSignupBtn = document.getElementById('open-popup-btn')
const openLoginBtn = document.getElementById('open-login-btn')
const closeBtn = document.getElementById('close-popup-btn')
const modalOverlay = document.getElementById('modal-overlay')

const tabSignupBtn = document.getElementById('tab-signup-btn')
const tabSigninBtn = document.getElementById('tab-signin-btn')
const signupForm = document.getElementById('signup-form')
const signinForm = document.getElementById('signin-form')

if (!modalOverlay || !openSignupBtn) {
  console.error("Erreur : Un des éléments principaux est introuvable dans le HTML. Vérifie tes ID !");
}

modalOverlay.style.display = 'none';

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

openSignupBtn.addEventListener('click', () => {
  switchTab('signup')
  modalOverlay.style.display = 'flex'
})

if (openLoginBtn) {
  openLoginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    switchTab('signin')
    modalOverlay.style.display = 'flex'
  })
}

if (tabSignupBtn) tabSignupBtn.addEventListener('click', () => switchTab('signup'))
if (tabSigninBtn) tabSigninBtn.addEventListener('click', () => switchTab('signin'))

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none'
  })
}

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none'
  }
})

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nom = document.getElementById('signup-nom').value
    const prenom = document.getElementById('signup-prenom').value
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nom: nom,
          prenom: prenom
        }
      }
    })

    if (error) {
      alert("Erreur d'inscription : " + error.message)
      console.error(error)
    } else {
      window.location.href = 'client/client.html'
    }
  })
}

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
      window.location.href = 'client/client.html'
    }
  })
}
