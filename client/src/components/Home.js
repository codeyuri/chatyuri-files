import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import { useDispatch } from 'react-redux'; // try unta nako gamit redux pero naglisud ko
// import { addUser } from '../store/actions'; // try unta nako gamit redux pero naglisud ko

const Home = () => {
    const [name, setName] = useState('');
    let [nameLength, setNameLength] = useState(7);
    // const [room, setRoom] = useState(''); // wala lang ko nag buhat ug rooms
    const joinRef = useRef(null);

    // const dispatch = useDispatch(); // try unta nako gamit redux pero naglisud ko

    useEffect(() => {
        joinRef.current.focus();
    }, []);

    const handleChange = e => {
        let len = e.target.value.length;
        if ( len === 0 ) {
            setNameLength(7)
            setName(e.target.value)
        } else if ( len > 7 ) {
            return false
        } else {
            setNameLength(7 - len)
            setName(e.target.value)
        }
    }

    return (
        <div className="chat_home">
            <span>{nameLength}/7</span>
            <input 
                type="text"
                value={name}
                autoFocus={true} 
                ref={joinRef} 
                placeholder="Your Name..." 
                onChange={e => handleChange(e)}
            />
            <Link 
                to={`/chat?name=${name}`} 
                onClick={ e => (!name) ? e.preventDefault() : null}
            >
                <button type="submit" className="signin">Join Chat</button>
            </Link>
            {/* try unta redux
            <Link to="/chat" onClick={() => dispatch(addUser(name))} >
                <button type="submit" className="signin">Join Chat</button>
            </Link> */}
        </div>
    )
}
 
export default Home;