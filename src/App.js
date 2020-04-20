import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';

const App = (props) => {
    
    const [expenses, setExpenses] = useState([
        {
            "_id" : "5e96442b8a2fef2b68d6aee8",
            "category" : "Car",
            "description" : "New Tires",
            "amount" : -1000,
            "when" : "2020-04-14T22:30:00.000Z"
        },{
            "_id" : "5e96445f8a2fef2b68d6aee9",
            "category" : "Work",
            "description" : "Salary",
            "amount" : 4500,
            "when" : "2020-04-13T05:30:00.000Z"
        },{
            "_id" : "5e9648a87eb26346e04b06b8",
            "category" : "Education",
            "description" : "University tuition",
            "amount" : -1000,
            "when" : "2020-04-14T07:30:00.000Z"
        },{
            "_id" : "5e9648da7eb26346e04b06b9",
            "category" : "Education",
            "description" : "Thermodynamic book",
            "amount" : -450,
            "when" : "2020-04-14T15:00:00.000Z"
        }
    ]);

    return (
        <Router>
                <Navbar expenses={expenses} onExpenseChange={setExpenses} />
                <Container>
                    <Switch>
                        <Route exact path="/" render={(props)=><Home {...props} expenses={expenses} />} />
                        <Route path="/calendar" component={Calendar} />
                    </Switch>
                </Container>
        </Router>
    );
}

export default App;