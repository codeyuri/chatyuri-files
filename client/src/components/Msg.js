import React from 'react';
import ReactEmoji from 'react-emoji';

const Msg = ({msg: { user, text}, name}) => {
    let currentUser = false;
    let admin = false;

    const trimmedName = name.trim().toLowerCase();

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
            </div>
        </div>
    )
}

export default Msg
