import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import useAuthStore from "../store/useAuthStore"
import toast from 'react-hot-toast'

const SignInPage = () => {
    const { signIn, isSigningIn } = useAuthStore()
    const [hidePassword, setHidePassword] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })
    const validateForm = () => {
        const fields = ['username', 'password'] as const
        const newErrors = {...errors}

        fields.forEach((field) => {
            const value = formData[field as keyof typeof formData].trim()
            
            if (!value) {
                const formattedValue = field
                newErrors[field as keyof typeof errors] = `${formattedValue} is required`
            } else {
                newErrors[field as keyof typeof errors] = ""
            }
        })

        setErrors(newErrors)
        const isValid = Object.values(newErrors).every(err => err === "")
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const success = validateForm()
        if (!success) return toast.error('Please fill in all required fields')
        const payload = {
            username: formData.username,
            password: formData.password,
        }

        try {
            await signIn(payload)
            toast.success('Sign in successfull!')
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
            toast.error('Incorrect username or password')
        }
    }


    return <section className="w-full h-screen flex items-center justify-center">
        <div className="w-72">
            <form action="" onSubmit={handleSubmit}>
                <label className="w-full block py-2 font-medium" htmlFor="">Username</label>
                <input 
                    className="bg-gray-50 p-2 w-full outline-none text-sm" 
                    type="text" 
                    placeholder="Enter your username" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <span className="block text-red-300 text-xs py-2">{errors.username}</span>

                <label className="w-full block py-2 font-medium" htmlFor="">Password</label>
                <div className="w-full flex items-center space-between">
                    <input 
                        className="bg-gray-50 p-2 w-full outline-none text-sm" 
                        type={ hidePassword ? "password" : "text" } 
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <div>
                        <button type="button" onClick={() => setHidePassword(!hidePassword)}>
                            { hidePassword ? <FontAwesomeIcon icon={faEye} className="text-sm cursor-pointer" /> : <FontAwesomeIcon icon={faEyeSlash} className="text-sm cursor-pointer" /> }
                        </button>
                    </div>
                </div>
                <span className="block text-red-300 text-xs py-2">{errors.password}</span>
                <button 
                    disabled={isSigningIn}
                    type="submit"
                    className="w-full bg-black text-white text-sm py-2 px-4 rounded-md hover:bg-white hover:text-black hover:underline cursor-pointer my-2 font-medium"
                >
                    {
                        isSigningIn ? 'Loading...' : 'Sign In'
                    }
                </button>
            </form>
        </div>
    </section>
}

export default SignInPage