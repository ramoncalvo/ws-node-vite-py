import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import './App.css';

const App: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:5001');

        ws.current.onopen = () => {
            console.log('Connected to the server');
        };

        ws.current.onmessage = async (event) => {
            const text = await event.data.text();
            setMessages(prevMessages => [...prevMessages, text]);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() && ws.current) {
            ws.current.send(message);
            setMessage('');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <div className="App">
            <h1>WebSocket Client</h1>
            <input
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;