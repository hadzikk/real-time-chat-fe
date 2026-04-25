const BubbleChat = (avatar_url: string, full_name: string, message: string) => {
    return <div className="w-full flex">
        <div className="w-96 flex">
            <div className="w-10 h-10 rounded-full">
                <img
                    className="w-full h-full rounded-full object-cover object-fit object-center" 
                    src={avatar_url} 
                    alt="" 
                />
            </div>
            <div>
                <p className="font-bold text-sm">{full_name}</p>
                <span className="text-sm text-gray-900 line-clamp-1">{message}</span>
            </div>
        </div>
    </div>
}

export default BubbleChat