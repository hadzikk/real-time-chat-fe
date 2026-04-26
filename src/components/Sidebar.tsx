import PersonalChat from "./PersonalChat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import useChatStore from "../store/useChatStore"
import { useEffect } from "react"

const Sidebar = () => {
    const { getUsers, users, setSelectedUser, selectedUser, isUserLoading } = useChatStore()

    const onlineUsers = []

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUserLoading) return ( 
    <div className="w-1/5 h-full flex flex-col gap-4 pt-4">
        <div className="w-full flex items-center bg-mist-100 rounded-full py-2 px-5 gap-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
            <input 
                className="text-xs text-black w-full outline-none"
                type="text" 
                placeholder="Search name or create new chat..." 
            />
        </div>
        <ul className="w-full flex flex-col gap-1 overflow-y-auto no-scrollbar">
            <p>Loading....</p>
        </ul>
    </div>
    )

    return <div className="w-1/5 h-full flex flex-col gap-4 pt-4">
        <div className="w-full flex items-center bg-mist-100 rounded-full py-2 px-5 gap-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
            <input 
                className="text-xs text-black w-full outline-none"
                type="text" 
                placeholder="Search name or create new chat..." 
            />
        </div>
        <ul className="w-full flex flex-col gap-1 overflow-y-auto no-scrollbar">
            {users?.map((user) => (
                <PersonalChat
                    key={user._id}
                    avatar_url={user.avatar_url}
                    full_name={user.full_name}
                    messageCount={1}
                    message={"p"}
                />
            ))}
        </ul>
    </div>
}

export default Sidebar