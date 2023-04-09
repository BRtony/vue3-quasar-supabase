import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wmohpssfbokpihmffwik.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtb2hwc3NmYm9rcGlobWZmd2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxOTYyODUsImV4cCI6MTk5NTc3MjI4NX0.u99Nt_qDVJtOimhHA4jkSvt9bTdc2dZHY_Jx0lm_cgQ'
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Supabase client created', supabase)
export default function useSupabase () {
  return { supabase }
}
