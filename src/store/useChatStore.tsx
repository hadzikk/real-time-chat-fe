import { create } from 'zustand'
import axiosInstance from '../libs/axios'

type User = {
    _id: string,
    full_name: string,
    avatar_url: string
}

interface ChatProps {
    messages?: [],
    users?: User[],
    selectedUser?: null | string,
    isUserLoading?: boolean,
    isMessagesLoading?: boolean,
    getUsers: () => Promise<void>,
    getMessages: (userId: string) => Promise<void>,
    setSelectedUser: (selectedUser: string) => void,

}

const useChatStore = create<ChatProps>((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const response = await axiosInstance.get('/message/get-contact-list')
            const userData = Array.isArray(response) ? response : (Array.isArray(response?.data) ? response.data : [])
            set({ users: userData })
        } catch (error) {
            console.error('Error in fetching users: ', error)
            set({ users: [] })
        } finally {
            set({ isUserLoading: false })
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const response = await axiosInstance.get(`/${userId}`)
            set({ messages: response.data })
        } catch (error) {
            console.error('Error in fething messages: ', error)
        } finally {
            set({ isMessagesLoading: false })
        }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser })
}))

export default useChatStore