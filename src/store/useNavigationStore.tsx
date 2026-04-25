import { create } from 'zustand'

interface Navigation {
    isPopupOpen: boolean,
    openPopup: () => void,
    closePopup: () => void
}

const useNavigationStore = create<Navigation>((set) => ({
    isPopupOpen: false,
    
    openPopup: () => {
        set({ isPopupOpen: true })
    },
    closePopup: () => {
        set({ isPopupOpen: false })
    }
}))

export default useNavigationStore