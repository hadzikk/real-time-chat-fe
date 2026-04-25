import { useState } from "react"
import useAuthStore from "../store/useAuthStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import toast from "react-hot-toast"

const SignUpPage = () => {
    const { isSigningUp, signUp } = useAuthStore()
    
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        password: ""
    })

    const [error, setError] = useState({
        username: "",
        first_name: "",
        last_name: "",
        password: ""
    })
    
    const [hidePassword, setHidePassword] = useState(true)

    const validateForm = () => {
        const fields = ["username", "first_name", "last_name", "password"] as const;
        const newErrors = { ...error }

        fields.forEach((field) => {
            const value = formData[field as keyof typeof formData].trim()
            const modifiedValuesWithSpace = field.replaceAll("-", " ")
            const formattedValues = modifiedValuesWithSpace.charAt(0).toUpperCase() + modifiedValuesWithSpace.slice(1)
            
            if (!value) {
                newErrors[field as keyof typeof error] = `${formattedValues} is required`
            } else {
                newErrors[field as keyof typeof error] = ""
            }
        })

        setError(newErrors)
        const isValid = Object.values(newErrors).every(err => err === "")
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const success = validateForm()
        if (!success) return toast.error("Please fill in all required fields")
        
        const userPayload = {
            username: formData.username,
            password: formData.password,
            full_name: `${formData.first_name} ${formData.last_name}`.trim(),
            avatar_url: ""
        }

        signUp(userPayload)

        return toast.success("Sign up successful!")
    }

    return <section className="w-full h-screen flex bg-black p-3">
        <div className="w-2/3 h-full bg-green-200 flex justify-center items-center pt-28 rounded-md">
            <div className="w-74 h-112">
                <p className="text-center mb-4">brand</p>
                <h1 className="text-4xl text-center mb-2 font-bold">Get started</h1>
                <p className="text-center font-light mb-20">These below indicate your steps.</p>

                <div className="w-full flex items-center flex-col gap-2">
                    <div className="w-full py-3 px-5 flex items-center gap-2 bg-black rounded-md text-sm">
                        <i className="bg-white rounded-full w-4 h-4 flex items-center justify-center text-sm">i</i>
                        <p className="font-bold text-white">Sign up your account</p>
                    </div>

                    <div className="w-full py-3 px-5 flex items-center gap-2 bg-white rounded-md text-sm">
                        <i className="bg-white rounded-full w-4 h-4 flex items-center justify-center text-sm">i</i>
                        <p className="text-black">Set up your profile</p>
                    </div>
                    <div className="w-full py-3 px-5 flex items-center gap-2 bg-white rounded-md text-sm">
                        <i className="bg-white rounded-full w-4 h-4 flex items-center justify-center text-sm">i</i>
                        <p className="text-black">Completed!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-1/3 h-full justify-center items-center bg-black p-12">
            <div className="w-full h-full">
                <p className="text-center text-2xl font-medium mb-2 text-white">Sign Up Account</p>
                <p className="text-center text-gray-300 text-sm mb-16 font-light">Enter your personal data to create an account.</p>

                <form action="" onSubmit={handleSubmit}>
                    <div className="w-full mt-4">
                        <label className="block mb-2 font-medium text-slate-50 text-sm" htmlFor="">Username <span className="text-red-300">*</span></label>
                        <input 
                            className="w-full py-3 px-3 bg-zinc-900 rounded-md border-none outline-none text-white text-sm" 
                            type="text" 
                            placeholder="eg. johndoe"
                            value={formData.username} 
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                        <span className="text-red-300 text-xs">{error.username}</span>
                    </div>

                    <div className="w-full flex justify-between gap-4 mt-4">
                        <div className="w-full">
                            <label className="block mb-2 font-medium text-slate-50 text-sm" htmlFor="">First name <span className="text-red-300">*</span></label>
                            <input 
                                className="w-full py-3 px-3 bg-zinc-900 rounded-md border-none outline-none text-white text-sm" 
                                type="text" 
                                placeholder="eg. john" 
                                value={formData.first_name}
                                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                            />
                            <span className="text-red-300 text-xs">{error.first_name}</span>
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 font-medium text-slate-50 text-sm" htmlFor="">Last name</label>
                            <input 
                                className="w-full py-3 px-3 bg-zinc-900 rounded-md border-none outline-none text-white text-sm" 
                                type="text" 
                                placeholder="eg. doe" 
                                value={formData.last_name}
                                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                            />
                            <span className="text-red-300 text-xs">{error.last_name}</span>
                        </div>
                    </div>
                    
                    <label className="block font-medium text-white text-sm my-2" htmlFor="">Password <span className="text-red-300">*</span></label>
                    <div className="w-full py-3 px-3 bg-zinc-900 rounded-md flex justify-between items-center">
                        <input 
                            className="rounded-md border-none outline-none text-white text-sm" 
                            type={ hidePassword ? "password" : "text" } 
                            placeholder="Enter your password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <button type="button" onClick={() => setHidePassword(!hidePassword)}>
                            { hidePassword ? <FontAwesomeIcon icon={faEye} className="text-white text-sm cursor-pointer" /> : <FontAwesomeIcon icon={faEyeSlash} className="text-white text-sm cursor-pointer" /> }
                        </button>
                    </div>
                    <span className="text-red-300 text-xs">{error.password}</span>

                    <button type="submit" className="w-full py-3 px-5 bg-white focus:outline-none hover:underline text-sm rounded-md cursor-pointer font-medium mt-6" disabled={isSigningUp}>
                        {isSigningUp ? (
                            <>Loading...</>
                        ) : (
                            <>Next</>
                        )}
                    </button>
                </form>
            </div>
        </div>
    </section>
}

export default SignUpPage