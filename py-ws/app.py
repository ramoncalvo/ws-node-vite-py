import asyncio
import websockets


async def send_message():
    uri = "ws://localhost:5001"  # Update to the correct WebSocket URL
    async with websockets.connect(uri) as websocket:
        message = input("Enter your message: ")
        await websocket.send(message)
        print(f"Sent: {message}")

        response = await websocket.recv()
        print(f"Received: {response}")

if __name__ == "__main__":
    asyncio.run(send_message())
