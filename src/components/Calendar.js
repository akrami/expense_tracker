import React from "react";
import { Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Month from "./calendar/Month";
import Week from "./calendar/Week";
import Day from "./calendar/Day";
import Navbar from './calendar/Navbar';

const Calendar = () => {

    return (
        <>
            <Router>
                <Navbar />
                <Segment>
                    <Switch>
                        <Route exact path="/calendar/">
                            <Month />
                        </Route>
                        <Route path="/calendar/week">
                            <Week />
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
