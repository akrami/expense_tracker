import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Month from "./calendar/Month";
import Week from "./calendar/Week";
import Day from "./calendar/Day";
import Navbar from './calendar/Navbar';

const Calendar = props => {
    const { update } = props;

    const today = new Date();

    const [date, setDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0));

    const [monthData, setMonthData] = useState([]);
    const [weekData, setWeekData] = useState([]);

    useEffect(() => {
        console.log('Calendar useEffect');

        fetch(`http://localhost:9090/api/expenses/month/${date.getFullYear()}/${date.getMonth()}`)
            .then(result => result.json())
            .then(result => setMonthData(result));

        fetch(`http://localhost:9090/api/expenses/week/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)
            .then(result => result.json())
            .then(result => {
                console.log(`http://localhost:9090/api/expenses/week/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)
                console.log(result);
                setWeekData(result)
            });

    }, [date, update]);

    return (
        <>
            <Router>
                <Navbar />
                <Segment>
                    <Switch>
                        <Route exact path="/calendar/">
                            <Month month={date.getMonth()} year={date.getFullYear()} monthData={monthData} setDate={setDate} />
                        </Route>
                        <Route path="/calendar/week">
                            <Week day={date.getDate()} month={date.getMonth()} year={date.getFullYear()} setDate={setDate} weekData={weekData} />
                        </Route>
                        <Route path="/calendar/day">
                            <Day />
                        </Route>
                    </Switch>
                </Segment>
            </Router>
        </>
    );
};

export default Calendar;
