import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Month from "./calendar/Month";
import Week from "./calendar/Week";
import Day from "./calendar/Day";
import Navbar from './calendar/Navbar';

const Calendar = props => {
    const { update, setUpdate } = props;

    const today = new Date();
    const [date, setDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0));

    const [monthData, setMonthData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [dayData, setDayData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetch(`http://localhost:9090/api/expenses/month/${date.getFullYear()}/${date.getMonth()}`)
                .then(result => result.json())
                .then(result => setMonthData(result));

            await fetch(`http://localhost:9090/api/expenses/week/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)
                .then(result => result.json())
                .then(result => setWeekData(result));

            await fetch(`http://localhost:9090/api/expenses/day/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)
                .then(result => result.json())
                .then(result => setDayData(result));

            setLoading(false);
        }

        fetchData();
    }, [date, update]);

    return (
        <>
            <Router>
                <Navbar />
                <Segment loading={loading}>
                    <Switch>
                        <Route exact path="/calendar/" component={props => <Month month={date.getMonth()} year={date.getFullYear()} monthData={monthData} setDate={setDate} {...props} />} />
                        <Route path="/calendar/week">
                            <Week day={date.getDate()} month={date.getMonth()} year={date.getFullYear()} setDate={setDate} weekData={weekData} />
                        </Route>
                        <Route path="/calendar/day">
                            <Day day={date.getDate()} month={date.getMonth()} year={date.getFullYear()} setDate={setDate} dayData={dayData} update={update} setUpdate={setUpdate} />
                        </Route>
                    </Switch>
                </Segment>
            </Router>
        </>
    );
};

export default Calendar;
