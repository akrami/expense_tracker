import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';

const App = (props) => {
    
    return (
        <Router>
                <Navbar />
                <Container>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/calendar" component={Calendar} />
                    </Switch>
                </Container>
        </Router>
    );
}

export default App;