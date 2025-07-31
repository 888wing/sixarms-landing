import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// OAuth configuration
export const oauthConfig = {
  google: {
    scopes: 'openid email profile',
    redirectTo: `${process.env.NODE_ENV === 'production' 
      ? 'https://sixarms.ai' 
      : 'http://localhost:3000'}/auth/callback`
  },
  github: {
    scopes: 'user:email',
    redirectTo: `${process.env.NODE_ENV === 'production' 
      ? 'https://sixarms.ai' 
      : 'http://localhost:3000'}/auth/callback`
  }
}

// Helper functions for OAuth
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: oauthConfig.google.redirectTo,
      scopes: oauthConfig.google.scopes,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  })
  
  return { data, error }
}

export const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: oauthConfig.github.redirectTo,
      scopes: oauthConfig.github.scopes
    }
  })
  
  return { data, error }
}

// Enhanced auth helpers
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentSession = () => {
  return supabase.auth.getSession()
}

export const getCurrentUser = () => {
  return supabase.auth.getUser()
}