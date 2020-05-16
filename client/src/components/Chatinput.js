import React, { useEffect, useState } from 'react';

const Chatinput = ({name, message, setMessage, sendMessage, socket}) => {
    const [typing, setTyping] = useState(false);
    const [typingMsg, setTypingMsg] = useState('');

    // kani nga useeffect kay if naay mag type mo send padung sa server kinsa ang nag typing
    useEffect(() => {
        if (typing) {
            socket.emit('isTyping', name);
            setTimeout(() => {
                setTyping(false)
            }, 100)
        }
    }, [typing])

    // sa other users kay maka receive sila ug msg ug kinsa ang nag typing
    useEffect(() => {
        socket.on('isTyping', (data) => {
            setTypingMsg(`${data || 'Someone'} is typing a message....`)
            setTimeout(() => {
                setTypingMsg(false)
            }, 400)
        })
    }, [setTypingMsg, typing])

    const handleKeyPress = ev => {
        if (ev.key == 'Enter' && !ev.shiftKey) {
            sendMessage(ev)
            setTyping(false)
            setTypingMsg(false)
        } else {
            setTyping(true)
        }
    }

    return (
        <div className="chat_btm">
            <p className="typing">{ typingMsg }</p>
            <form onSubmit={e => sendMessage(e)}>
                <textarea 
                    type="text" 
                    autoComplete="off"
                    value={message}
                    placeholder="Type a message..." 
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => handleKeyPress(e)}
                >
                </textarea>
                <button id="sendbtn">Send</button>
            </form>
        </div>
    )
}

export default Chatinput
