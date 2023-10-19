"use client"
import {useChat, Message} from "ai/react"

export default function ChatComponent() {

  const {input, handleInputChange, handleSubmit, messages} = useChat();

  console.log(messages);
  
  return (
    <div>



      {messages.map((message : Message) => {
                return (
                    <div key={message.id}>
                        {/*  Name of person talking */}
                        {
                            message.role === "assistant"
                            ?
                            <h3 className="font-semibold mt-2">
                                Tsen-wen River
                            </h3>
                            :
                            <h3 className="font-semibold mt-2">
                                User
                            </h3>
                        }
                        
                        {/* Formatting the message */}
                        {message.content.split("\n").map((currentTextBlock: string, index : number) => {
                            if(currentTextBlock === "") {
                                return <p key={message.id + index}>&nbsp;</p> // " "
                            } else {
                                return <p key={message.id + index}>{currentTextBlock}</p> // "Cooper Codes is a YouTuber"
                            }
                        })}


                        {/*  
                            Cooper Codes is a YouTuber

                            He makes software content

                            You should subscribe.

                            ["Cooper Codes is a YouTuber", "", "He makes software content", "", "You should subscribe."]

                        */}
                    </div>
                )
            })}

      <form onSubmit={handleSubmit}>
      <h3>User Message</h3>
        <textarea
          placeholder={"Ask a question, give an opinion or simply have a chat with the Tsen-wen River..."}
          value = {input}
          onChange = {handleInputChange}
        ></textarea>
        <button className="btn-primary">Send Message</button>
      </form>
    </div>
  )
}
