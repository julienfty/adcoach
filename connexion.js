import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Initialise Supabase avec tes propres clés (trouvées dans ton dashboard Supabase > Project Settings > API)
const supabaseUrl = 'https://gyojzwmknilkglcywvck.supabase.co'
const supabaseAnonKey = 'sb_publishable_UoIyjRbVbUoURw4psuk68w_4t_Z4iS8'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const form = document.getElementById('signup-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault() // Empêche la page de recharger

  const email = document.getElementById('signup-email').value
  const password = document.getElementById('signup-password').value

  // Inscription de l'utilisateur
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    alert("Erreur : " + error.message)
    console.error(error)
  } else {
    alert("Compte créé avec succès ! Tu es connecté.")
    console.log("Utilisateur :", data.user)
    // Redirige l'utilisateur vers une autre page ou actualise l'UI
  }
})
