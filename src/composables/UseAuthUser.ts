import { ref } from 'vue'
import useSupabase from 'boot/supabase'

type signUpOptions = {
  emailRedirectTo?: string;
  data?: object;
  captchaToken?: string;
} | undefined;

const user = ref(null)
export default function useAuthUser () {
  const { supabase } = useSupabase()

  const login = async (email: string, password: string) => {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return { user }
  }

  const loginWithSocialProvider = async (credentials: any) => {
    const { data: { provider }, error } = await supabase.auth.signInWithOAuth(credentials)
    if (error) throw error
    return { provider }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const register = async (email: string, password: string, meta: signUpOptions) => {
    const { data: { user }, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: meta,
          emailRedirectTo: `${window.location.origin}/me?fromEmail=confirmRegistration`
        }
      }
    )
    if (error) throw error
    return user
  }

  const update = async (data: any) => {
    const { data: { user }, error } = await supabase.auth.updateUser(data)
    if (error) throw error
    return user
  }

  const sendPasswordResetEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return data
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail
  }
}
