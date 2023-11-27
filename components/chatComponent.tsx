"use client";
import { useChat, Message } from "ai/react";
import { useRef, useEffect } from "react";
import Image from "next/image";

type Props = {
  nickname: String;
};

export default function ChatComponent({ nickname }: Props) {
  const { input, handleInputChange, handleSubmit, messages } = useChat();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current !== null) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <div>
      {messages.map((message: Message) => {
        return (
          <div key={message.id}>
            {/*  Name of person talking */}
            {message.role === "assistant" &&
            (message.content.includes("As a rock") ||  message.content.includes("石頭") ||
              message.content.includes("as a rock")) ? (
              <div className="flex items-center">
                <Image src="/rock.png" alt="rock icon" width={90} height={90} />
                <h3 className="font-semibold mt-2 pl-2">石頭:</h3>
              </div>
            ) : message.role === "assistant" ? (
              <div className="flex items-center">
                <Image
                  src="/river.png"
                  alt="rock icon"
                  width={90}
                  height={90}
                />
                <h3 className="font-semibold mt-2 pl-2">Tsen-wen River:</h3>
              </div>
            ) : (
              <h3 className="font-semibold mt-2">{nickname}:</h3>
            )}

            {/* Formatting the message */}
            {message.content
              .split("\n")
              .map((currentTextBlock: string, index: number) => {
                if (currentTextBlock === "") {
                  return <p key={message.id + index}></p>;
                } else {
                  return (
                    <p
                      className="bg-white p-2 rounded-b-[20px] rounded-tr-[20px] border border-[#00A6A3]"
                      key={message.id + index}
                    >
                      {currentTextBlock}
                    </p>
                  );
                }
              })}
          </div>
        );
      })}

      <form onSubmit={handleSubmit}>
        <div ref={divRef}>
          <h3>{nickname}:</h3>
          <textarea
            className="resize-y h-24"
            placeholder={
              "Ask a question, give an opinion or simply have a chat with the Tsen-wen River..."
            }
            value={input}
            onChange={handleInputChange}
          ></textarea>
          <button className="btn-primary rounded-[30px]">Send Message</button>
        </div>
      </form>
    </div>
  );
}
