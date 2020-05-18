import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

import Home from './components/Home';
import Chatroom from './components/Chatroom';

// const socket = io('http://localhost:5000', {
const socket = io('https://chatyuri.herokuapp.com/', {
    transports: ['websocket'],
    jsonp: false,
    'forceNew': true,
    forceNew: true,
});

const App = () => {
    return (
        <div className="chat_con">
            <Switch>
                <Route path="/" exact render={(props) => <Home socket={socket} />} />
                <Route path="/chat" render={(props) => <Chatroom socket={socket} />} />
                <Route render={() => <Redirect to="/" />} />
                {/* <Route path="/" exact component={Home} /> */}
                {/* <Route path="/chat" exact component={Chatroom} /> */}
                {/* <Route path="/chat?name=:1" render={() => <Redirect to="/awwww" />} /> */}
            </Switch>
        </div>
    )
}
 
export default App;