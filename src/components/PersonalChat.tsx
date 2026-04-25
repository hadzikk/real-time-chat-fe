interface PersonalChatProps {
    avatar_url: string,
    full_name: string,
    message: string,
    isSelected: boolean,
    messageCount: number,
}

const PersonalChat = ({ avatar_url, full_name, message, isSelected, messageCount }: PersonalChatProps) => {
    return <li className={isSelected ? 'rounded-sm p-2 inline-block w-full bg-mist-100' : 'rounded-sm p-2 inline-block w-full hover:bg-mist-100'}>
                <a href="" className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
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
                    <div className={messageCount > 0 ? 'font-bold' : ''}>
                        <span className="text-xs block">19:06</span>
                        <span className="text-sm block">{messageCount > 0 ? messageCount : ''}</span>
                    </div>
                </a>
            </li>
}

export default PersonalChat