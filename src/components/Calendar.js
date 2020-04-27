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

    const [monthData, setMonthData] = useState([]);

    useEffect(() => {
        setDay(date.getDay());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
    }, [date]);

    useEffect(() => {
        fetch(`http://localhost:9090/api/expenses/month/${year}/${month+1}`)
        .then(result=>result.json())
        .then(result=> setMonthData(result));
        
    }, [month, year]);

    return (
        <>
            <Router>
                <Navbar />
                <Segment>
                    <Switch>
                        <Route exact path="/calendar/">
                            <Month month={month} year={year} monthData={monthData} setDate={setDate} />
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
