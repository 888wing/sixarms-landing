import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User, AuthError } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false
  })

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (!mounted) return

        if (error) {
          console.error('Session error:', error)
          setState(prev => ({
            ...prev,
            error: error.message,
            loading: false
          }))
          return
        }

        setState(prev => ({
          ...prev,
          user: session?.user ?? null,
          isAuthenticated: !!session?.user,
          loading: false,
          error: null
        }))
      } catch (err) {
        if (!mounted) return
        
        console.error('Auth initialization error:', err)
        setState(prev => ({
          ...prev,
          error: 'Failed to initialize authentication',
          loading: false
        }))
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return

        console.log('Auth state changed:', event, session?.user?.email)

        setState(prev => ({
          ...prev,
          user: session?.user ?? null,
          isAuthenticated: !!session?.user,
          loading: false,
          error: null
        }))

        // Handle specific auth events
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('user-preferences')
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true }))
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }))
        return { error }
      }

      // State will be updated via onAuthStateChange
      return { error: null }
    } catch (err) {
      const errorMessage = 'Failed to sign out'
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }))
      return { error: { message: errorMessage } as AuthError }
    }
  }

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }))
  }

  const refreshSession = async () => {
    setState(prev => ({ ...prev, loading: true }))
    
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()
      
      if (error) {
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }))
        return
      }

      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
        loading: false,
        error: null
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to refresh session',
        loading: false
      }))
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    signOut,
    clearError,
    refreshSession,
  }
}