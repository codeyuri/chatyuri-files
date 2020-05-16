import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import io from 'socket.io-client';

import ChatWindow from './ChatWindow';
import Chatinput from './Chatinput';
import OnlineUsers from './OnlineUsers';

// gi usa lang ko ni para ipasa nako as props ang socket sa lain components
// for dev
const socket = io('http://localhost:5000', {
// const socket = io('https://chatyuri.netlify.app', {
    transports: ['websocket'],
    jsonp: false
});

const Chatroom = () => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [navOpen, setNavOpen] = useState(false);
    const chat = useSelector(state => state.chat)
    // const ENDPOINT = 'http://localhost:5000'; // mao ni una nako gamit

    useEffect(() => {
        const { name } = queryString.parse(location.search)
        // socket = io(ENDPOINT);
        // setName(chat.user)
        setName(name)
        
        socket.emit('joinedChat', { name }, () => {
            // nothing here
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [socket])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(msgs => [...msgs, message]);
        })

        socket.on('usersOnline', ({ users }) => {
            setUsers(users);
          });
    }, [])

    const sendMessage = e => {
        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="chat_page">
            <div className="chat_top_div">
                <h2>Chatyuri <small>Chat App by Dan Quesada III</small></h2>
                { navOpen ? (
                    <>
                        <strong onClick={() => setNavOpen(false)} className="close"></strong>
                        <OnlineUsers users={users} />
                    </>
                 ) : <strong onClick={() => setNavOpen(true)} className="open"></strong>}
            </div>
            <ChatWindow 
                messages={messages}
                name={name}
            />
            <Chatinput
                name={name}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                socket={socket}
            />
        </div>
    )
}
 
export default Chatroom;