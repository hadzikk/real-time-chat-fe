import { useRef, useState } from "react"
import useAuthStore from "../store/useAuthStore"
import toast from 'react-hot-toast'
import useNavigationStore from "../store/useNavigationStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"

const Profile = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { isSigningOut, signOut, authUser, updateProfile, avatar } = useAuthStore()
    const { isPopupOpen, closePopup } = useNavigationStore()
    const [image, setImage] = useState<string | undefined>(avatar || authUser?.avatar_url)

    const handleLogout = () => {
        signOut()
        toast.success('Sign out success!')
        closePopup()
    }

    const handleClosePopup = () => {
        closePopup()
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setImage(base64Image as string)
            updateProfile({ avatar: base64Image })
        }
    }

    return <div className={isPopupOpen ? "w-full h-screen fixed top-0 left-0 flex justify-center items-center block" : "w-full h-screen fixed top-0 left-0 flex justify-center items-center hidden"}>
            <div className="w-96 h-140 bg-white rounded-sm p-2 relative">
                <div className="w-full flex justify-center items-center h-fit">
                    <div className="w-30 h-30 rounded-full cursor-pointer hover:border border-gray-300" onClick={handleImageClick}>
                        <img 
                            className="w-full h-full object-cover object-fit rounded-full cursor-pointer"
                            src={image || authUser?.avatar_url} 
                            alt="" 
                        />
                    </div>
                    <input 
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                    />
                </div>
                <div className="w-full flex flex-col justify-between px-8 mb-4">
                    <p className="text-sm text-gray-500">Member since</p>
                    <p className="text-sm mb-4">{authUser?.createdAt?.split('T')[0]}</p>
                    <FontAwesomeIcon 
                        className="text-sm cursor-pointer"
                        icon={faPencil} 
                    />
                    <div className="w-full">
                        <label className="w-full block text-sm">Username</label>
                        <input 
                            className="w-full text-sm text-black block"
                            disabled={true} 
                            type="text" 
                            placeholder={authUser?. username} 
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-between px-8 mb-4">
                    <FontAwesomeIcon 
                        className="text-sm cursor-pointer"
                        icon={faPencil} 
                    />
                    <div className="w-full">
                        <label className="w-full block text-sm">Full name</label>
                        <input 
                            className="w-full text-sm text-black block"
                            disabled={true} 
                            type="text" 
                            placeholder={authUser?. full_name} 
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-between px-8 mb-4">
                    <FontAwesomeIcon 
                        className="text-sm cursor-pointer"
                        icon={faPencil} 
                    />
                    <div className="w-full">
                        <label className="w-full block text-sm">Password</label>
                        <input 
                            className="w-full text-sm text-black block"
                            disabled={true} 
                            type="password" 
                            placeholder="**********" 
                        />
                    </div>
                </div>
                <div className="w-full absolute bottom-0 left-0 p-4 flex justify-end">
                    <button 
                        onClick={handleLogout}
                        className="py-2 px-4 rounded-sm text-sm text-center cursor-pointer hover:underline"
                    >
                        {
                            isSigningOut ? '...' : 'Sign out'
                        }
                    </button>
                    <button 
                        onClick={handleClosePopup}
                        className="py-2 px-4 rouded-sm text-sm text-center cursor-pointer hover:underline"
                    >Close</button>
                </div>
            </div>
        </div>
}

export default Profile