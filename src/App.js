import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';

const App = (props) => {

    const [expenses, setExpenses] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        fetch("http://localhost:9090/api/expenses")
            .then(res => res.json())
            .then(res => {
                setExpenses(res);
                console.log('fetched');
            });
    }, [update]);

    const newExpenseHandler = data => {
        const { category, description, amount, when } = data;
        fetch('http://localhost:9090/api/expenses', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category,
                description,
                amount,
                when
            })
        })
            .then(response => response.json())
            .then(response => setUpdate(!update))
            .catch(error => console.log(error));
    }

    return (
        <Router>
            <Navbar expenses={expenses} onNewExpense={newExpenseHandler} />
            <Container>
                <Switch>
                    <Route exact path="/" render={(props) => <Home {...props} expenses={expenses} />} />
                    <Route path="/calendar" component={Calendar} />
                </Switch>
            </Container>
        </Router>
    );
}

export default App;