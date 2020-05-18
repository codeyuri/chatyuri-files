import React from 'react';

const TextContainer = ({ users, navOpen }) => {
    return (
        <div className={navOpen ? 'users_div active' : 'users_div'}>
        {users ? (
            <>
                <h3>Online Users:</h3>
                <ul>
                    {users.map(({name}) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            </>
        ) : null }
      </div>
    )
};

export default TextContainer;