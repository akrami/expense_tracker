import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';

const App = (props) => {

    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [days, setDays] = useState([]);
    const [top, setTop] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        console.log('App useEffect');

        fetch("http://localhost:9090/api/expenses")
            .then(result => result.json())
            .then(result => setExpenses(result));

        fetch("http://localhost:9090/api/expenses/total")
            .then(result => result.json())
            .then(result => setTotal(result[0].total));

        fetch("http://localhost:9090/api/expenses/data/last30days")
            .then(result => result.json())
            .then(result => setDays(result));

        fetch("http://localhost:9090/api/expenses/data/top-categories")
            .then(result => result.json())
            .then(result => setTop(result));
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
            .then(() => setUpdate(!update))
            .catch(error => console.log(error));
    }

    return (
        <Router>
            <Navbar expenses={expenses} onNewExpense={newExpenseHandler} />
            <Container>
                <Switch>
                    <Route exact path="/" render={props => <Home {...props} expenses={expenses} total={total} days={days} tops={top} />} />
                    <Route path="/calendar">
                        <Calendar update={update} />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;