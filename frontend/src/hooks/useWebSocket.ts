import { useEffect, useState } from "react"



export function useWebSocket() {
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [message, setMessage] = useState("")
    const [fresh, setFresh] = useState(true)

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws")

        socket.onopen = () => setWs(socket)
        socket.onmessage = event => setMessage(event.data)


        return () => {
            socket.close()
        }
    }, [fresh])

    const refresh = () => setFresh(!fresh)

    return { ws, message, refresh}
}