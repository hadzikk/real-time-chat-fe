import { create } from 'zustand'
import axiosInstance from '../libs/axios'

const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const response = await axiosInstance.get('/message/get-contact-list')
            set({ users: response.data })
        } catch (error) {
            console.error('Error in fetching users: ', error)
        } finally {
            set({ isUserLoading: false })
        }
    }
}))

export default useChatStore