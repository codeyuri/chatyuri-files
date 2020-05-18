import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Msg from './Msg';

const ChatWindow = ({messages, name, setNavOpen}) => {
    return (
        <ScrollToBottom>
            <div className="chat_window" onClick={e => setNavOpen(false)}>
                {messages.map((msg, i) => {
                    return (<div key={i}>
                        <Msg msg={msg} name={name}/>
                    </div>)
                })}
            </div>
        </ScrollToBottom>
    )
}

export default ChatWindow
