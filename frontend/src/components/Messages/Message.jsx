/* eslint-disable no-unused-vars */
import {UseAuthContext} from "../../Context/authcontext.jsx"
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime.js";

const Message = ({message}) => {
  const { authUser } = UseAuthContext();
	const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-green-500" : "bg-orange-500";
  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className='w-10 rounded-full'>
            <img alt='Tailwind CSS chat bubble component' src={profilePic} />
            </div>
        </div>
        <div className={` chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs text-red-400 flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message