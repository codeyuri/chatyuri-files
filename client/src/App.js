import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Chatroom from './components/Chatroom';

const App = () => {
    return (
        <div className="chat_con">
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/chat" component={Chatroom} />
                </Switch>
            </Router>
        </div>
    )
}
 
export default App;