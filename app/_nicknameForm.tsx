"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Nickname() {
    const router = useRouter();

    const [nickName, setNickName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);

        const user = {
            "id": 2, 
            "nickname": nickName
        }

        const res = await fetch('http://localhost:4000/nickname', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })

        if(res.status === 201){
            router.push('/chat');
        }
    }

    return (
        
        <form onSubmit={handleSubmit} className="w-1/2">
            <label>What's your nickname?
            <input
                required
                type="text"
                onChange={(e)=>setNickName(e.target.value)}
                value={nickName}
            />
            </label>
            <button 
                className="btn-primary" 
                disabled={isLoading}
            >
                {isLoading && <span>loading...</span>}
                {!isLoading && <span>Start Conversation</span>} 
                </button>
        </form>
        
    )
}
