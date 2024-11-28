**WeChat Real-Time Chat Application**

A simple real-time chat application built with Socket.IO, where users can exchange messages instantly.

*Requirements*
---------------
Node.js: Ensure Node.js is installed on your machine.
Web-Socket: Real-time communication.

*Architecture*
--------------
Client: Built using HTML, CSS, and JavaScript. The client sends messages and listens for incoming messages in real-time via Socket.IO.
Server: Node.js server using Socket to handle WebSocket connections and broadcast messages to all connected clients.


*Instructions to Run*
---------------------
1. Clone the Repository
git clone https://github.com/your-username/wechat-real-time-chat.git
cd wechat-real-time-chat

2. Install Dependencies
npm install

3. Run the Server
node index.js
The server will start on localhost:8000.

4. Open the Client
Open your browser and go to:
http://localhost:8000


*deployment link*
https://chat-app-manas0066-manas0066s-projects.vercel.app/


You’ll be prompted to enter your name and join the chat.

Assumptions and Design Choices
Real-Time Communication: Using Socket.IO to broadcast messages between clients instantly.
No Database: Messages are not stored persistently. They exist only during the session.
