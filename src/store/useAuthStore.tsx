import { create } from 'zustand'
import axiosInstance from '../libs/axios'

interface User {
    username: string,
    full_name: string,
    avatar_url?: string,
    createdAt?: string
}

interface AuthState {
    authUser: User | null,
    isSigningUp: boolean,
    isSigningIn: boolean,
    isLoggingIn: boolean,
    isSigningOut: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean,
    avatar: string | null,
    checkAuth: () => Promise<void>,
    signUp: (data: User) => Promise<void>,
    signIn: (data: { username: string, password: string }) => Promise<void>,
    signOut: () => Promise<void>,
    updateProfile: (data: { avatar: string| ArrayBuffer | null }) => Promise<void>,
}

const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isSigningIn: false,
    isSigningOut: false,
    avatar: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check', { withCredentials: true })
            set({ authUser: response.data })
        } catch (error) {
            console.error('Error in checking authentication: ', error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        set({isSigningUp: true})
        try {
            const response = await axiosInstance.post('/auth/signup', data)
            if (!response) console.error('Failed to create user!')
            set({ authUser: response.data }) 
        } catch (error) {
            console.error('Error in sign up: ', error)
        } finally {
            set({ isSigningUp: false })
        }
    },

    signIn: async (data) => {
        set({isSigningIn: true})
        try {
            const response = await axiosInstance.post('/auth/signin', data)
            set({ authUser: response.data })
        } catch (error) {
            console.error('Error in sign in: ', error)
            throw error
        } finally {
            set({isSigningIn: false})
        }
    },

    signOut: async () => {
        set({isSigningOut: true})
        try {
            await axiosInstance.post('/auth/signout')
            set({ authUser: null })
        } catch (error) {
            console.error('Error in sign out: ', error)
        } finally {
            set({isSigningOut: false})
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile: true})
        try {
            const response = await axiosInstance.put('/user/update-avatar', data)
            set({ authUser: response.data })
            console.log('Profile updated successfully!')
        } catch (error) {
            console.error('Error in updating profile: ', error)
            throw error
        } finally {
            set({ isUpdatingProfile: false })
        }
    }
}))

export default useAuthStore