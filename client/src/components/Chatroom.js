import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux'; // try ta ko redux store
import queryString from 'query-string';

import ChatWindow from './ChatWindow';
import Chatinput from './Chatinput';
import OnlineUsers from './OnlineUsers';

const Chatroom = ({socket}) => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [navOpen, setNavOpen] = useState(false);
    // const chat = useSelector(state => state.chat) // try ta ko redux store

    useEffect(() => {
        let { name } = queryString.parse(location.search)
        if (!name) {
            name = 'None' // gibutang lang ko ni para di mag undefined ang name pero unnecessary unta ni
            window.location.replace('/');
        }
        // gi butangan lang nako ug slice kay sa local if mag manual search sa chatroom kay makasud gihapon bisag 
        // lapas sa max character sa name
        // sa URL if sa local nya if lapas ang max char kay makita gyapon sa URL pero naka slice na sya sa chatwindow
        let slicedName = name.slice(0, 10)
        // socket = io(ENDPOINT);
        // setName(chat.user)
        setName(slicedName)
       
        socket.emit('joinedChat', { name }, (error) => {
            if(error) {
                alert(error);
                window.location.replace('/');
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [socket, location.search])

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

    //prevent backspace sa keyboard ma exit ang app except sa textarea or input elements
    // kaso dili working sa mobile kay lain ang keycode sa backspace sa mobile, react native unta makaya guro
    // dili pa ko kamao sa react native haha
    useEffect(() => {
        let addev = window.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace' || event.keyCode == 229 || event.keyCode == 8 || event.key == 229 || event.key == 8) {
                var rx = /input|select|textarea/i;
                if (!rx.test(event.target.tagName) || event.target.disabled || event.target.readOnly ) {
                    event.preventDefault();
                    return false;
                }
            }
        });
        return () => {
            window.removeEventListener('keydown', addev);
        }
    }, [addEventListener]);

    return (
        <div className="chat_page" id="test">
            <div className="chat_top_div">
                <h2>Chatyuri <small>Chat App <q>by Dan Quesada III</q></small></h2>
                <div className="chat_top_right">
                    <span>({users.length})</span>
                    <strong onClick={() => setNavOpen(!navOpen)} className={navOpen ? 'close' : 'open'}></strong>
                </div>
            </div>
            <ChatWindow 
                messages={messages}
                name={name}
                setNavOpen={setNavOpen}
            />
            <Chatinput
                name={name}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                socket={socket}
            />
            <OnlineUsers users={users} navOpen={navOpen} />
        </div>
    )
}
 
export default Chatroom;