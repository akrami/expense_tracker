import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Month from "./calendar/Month";
import Week from "./calendar/Week";
import Day from "./calendar/Day";
import Navbar from './calendar/Navbar';

const Calendar = () => {

    const today = new Date();

    const [date, setDate] = useState(today);
    const [day, setDay] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    useEffect(() => {
        setDay(date.getDay());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
    }, [date]);

    return (
        <>
            <Router>
                <Navbar />
                <Segment>
                    <Switch>
                        <Route exact path="/calendar/">
                            <Month month={month} year={year} setDate={setDate} />
                        </Route>
                        <Route path="/calendar/week">
                            <Week />
                        </Route>
                        <Route path="/calendar/day">
                            <Day day={day} />
                        </Route>
                    </Switch>
                </Segment>
            </Router>
        </>
    );
};

export default Calendar;
