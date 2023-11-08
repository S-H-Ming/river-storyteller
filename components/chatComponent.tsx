"use client";
import { useChat, Message } from "ai/react";

type Props = {
  nickname: String;
}

export default function ChatComponent({nickname}: Props) {
  const { input, handleInputChange, handleSubmit, messages } = useChat();
  console.log("name: "+nickname);
  return (
    <div>
      {messages.map((message: Message) => {
        return (
          <div key={message.id}>
            {/*  Name of person talking */}
            {message.role === "assistant" &&
            message.content.includes("As a rock") ? (
              <h3 className="font-semibold mt-2">Rock</h3>
            ) : message.role === "assistant" ? (
              <h3 className="font-semibold mt-2">Tsen-wen River:</h3>
            ) : (
              <h3 className="font-semibold mt-2">{nickname}:</h3>
            )}

            {/* Formatting the message */}
            {message.content
              .split("\n")
              .map((currentTextBlock: string, index: number) => {
                if (currentTextBlock === "") {
                  return <p key={message.id + index}>&nbsp;</p>; // " "
                } else {
                  return <p key={message.id + index}>{currentTextBlock}</p>;
                }
              })}
          </div>
        );
      })}

      <form onSubmit={handleSubmit}>
        <h3>{nickname}:</h3>
        <textarea className="resize-y h-24"
          placeholder={
            "Ask a question, give an opinion or simply have a chat with the Tsen-wen River..."
          }
          value={input}
          onChange={handleInputChange}
        ></textarea>
        <button className="btn-primary">Send Message</button>
      </form>
    </div>
  );
}
