import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addUser } from '../store/actions';

const Home = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const joinRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        joinRef.current.focus();
    }, []);

    return (
        <div className="chat_home">
            <input type="text" ref={joinRef} placeholder="Your Name..." onChange={e => setName(e.target.value)} />
            {/* <Link to="/chat" onClick={() => dispatch(addUser(name))} ><button type="submit" className="signin">Join Chat</button></Link> */}
            <Link 
                to={`/chat?name=${name}`} 
                onClick={ e => (!name) ? e.preventDefault() : null}
            >
                <button type="submit" className="signin">Join Chat</button>
            </Link>
        </div>
    )
}
 
export default Home;