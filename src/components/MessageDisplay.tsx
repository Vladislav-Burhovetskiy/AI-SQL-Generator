interface UserMessage {
  role: string;
  content: string;
}

interface MessageDisplayProps {
  message: UserMessage;
}

const MessageDisplay = ({ message } : MessageDisplayProps) => {
  return (
    <div className="message-display">
      <p id={"icon"}>⊚</p>
      <p className="user">{message.role}:</p>
      <p className="user-message">{message.content}</p>
    </div>
  );
};

export default MessageDisplay;