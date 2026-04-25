import Profile from "../components/Profile"
import RoomChat from "../components/RoomChat"
import Sidebar from "../components/Sidebar"
import Widget from "../components/Widget"

const HomePage = () => {
    return <section className="w-full h-screen overflow-hidden bg-stone-200">
        <Profile />
        <div className="w-full h-full flex">
            <Widget />
            <Sidebar />
            <RoomChat />
        </div>
    </section>
}

export default HomePage