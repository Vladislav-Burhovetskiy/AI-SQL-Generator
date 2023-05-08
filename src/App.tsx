import { useState } from "react";
import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";

interface ChatData {
  role: string;
  content: string;
}

const App = () => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);

  const getQuery = async () => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      };

      const data: ChatData = await (
        await fetch("http://127.0.0.1:8000/completions", options)
      ).json();
      // const data = await response.json();
      const userMessage = {
        role: "user",
        content: value,
      };
      setChat((oldChat) => [...oldChat, data, userMessage]);
    } catch (error) {
      console.log(error);
    }
  };
  const clearChat = () => {
    setChat([]);
    setValue("");
  };

  const userMessagesFiltered = chat.filter(
    (message) => message.role === "user"
  );
  const latestChatCode = chat
    .filter((message) => message.role === "assistant")
    .pop();
  
  const errorFixMessage = `If "Get Quary" button don't work: You must use your own API openai KEY! Please follow the link: "https://platform.openai.com/account/api-keys" and create new secret key, than fix the code in index.ts or add new file .env in the root of your project and put inside new key as a variable API_KEY, but without "";`
  return (
    <div className="app">
      <MessagesDisplay userMessages={userMessagesFiltered} />
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <CodeDisplay text={latestChatCode?.content ? latestChatCode.content : errorFixMessage} />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          Get Quary!
        </button>
        <button id="clear-chat" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default App;
