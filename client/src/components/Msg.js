import React from 'react';
import ReactEmoji from 'react-emoji';

const Msg = ({msg: { user, text, time}, name}) => {
    let currentUser = false;
    let admin = false;

    // gi butangan lang nako ug slice kay sa local if mag manual search sa chatroom kay makasud gihapon bisag 
    // lapas sa max character sa name
    // sa URL if sa local nya if lapas ang max char kay makita gyapon sa URL pero naka slice na sya sa chatwindow
    const trimmedName = name.trim().toLowerCase().slice(0, 10);

    if(user === trimmedName) {
        currentUser = true;
    }

    if(user === 'Admin') {
        admin = true;
    }

    return (
        <div className={ admin ? 'msg_con admin' : 'msg_con' }>
            <div className={ currentUser ? 'msg_box current' : 'msg_box' }>
                <small>{ currentUser ? trimmedName : user }</small>
                <div className="msg">
                    <p>{ReactEmoji.emojify(text)}</p>
                </div>
                <span>{time}</span>
            </div>
        </div>
    )
}

export default Msg
