import React from "react";
import { Button, Table, Icon, Header } from "semantic-ui-react";

const Month = props => {
    const { month, year, setDate, monthData, history } = props

    const startDayOfMonth = new Date(year, month, 1).getDay();
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augist', 'September', 'October', 'November', 'December'];
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const days = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    monthData.map(each => {
        each.date = new Date(each.date).toLocaleDateString();
        return each;
    });

    return (
        <>
            <Table celled fixed id="month-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="7" textAlign="center" verticalAlign="middle">
                            <Button floated="left" onClick={() => { setDate(new Date(year - 1, month, 1)) }} icon labelPosition="left"><Icon name="left arrow" /> {year - 1}</Button>
                            <Button floated="left" onClick={() => { setDate(new Date(year, month - 1, 1)) }} icon labelPosition="left"><Icon name="left arrow" /> {months[month === 0 ? 11 : month - 1]}</Button>
                            <Header as="h2">{months[month]} {year}</Header>
                            <Button floated="right" onClick={() => { setDate(new Date(year + 1, month, 1)) }} icon labelPosition="right">{year + 1} <Icon name="right arrow" /></Button>
                            <Button floated="right" onClick={() => { setDate(new Date(year, month + 1, 1)) }} icon labelPosition="right">{months[month === 11 ? 0 : month + 1]} <Icon name="right arrow" /></Button>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        {weekDays.map(d => <Table.HeaderCell key={d}>{d}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        Array(Math.ceil((days[month] + startDayOfMonth) / 7)).fill(null).map((_, weekIndex) => {
                            return (
                                <Table.Row key={weekIndex}>
                                    {Array(7).fill(null).map((_, dayIndex) => {
                                        const theDay = (weekIndex * 7 + dayIndex) - startDayOfMonth + 1;
                                        const today = new Date();
                                        const isToday = (theDay === today.getDate() && month === today.getMonth() && year === today.getFullYear());
                                        if (theDay > 0 && theDay <= days[month]) {
                                            return (<Table.Cell key={theDay} className={isToday ? 'today day' : 'day'} onClick={() => {
                                                setDate(new Date(year, month, theDay, 0, 0, 0, 0));
                                                history.push('/calendar/day');
                                            }}>
                                                <Header as="h4">{theDay}</Header>
                                                <div className="blue">{monthData[theDay - 1] ? monthData[theDay - 1]['income'] : 0}</div>
                                                <div className="red">{monthData[theDay - 1] ? monthData[theDay - 1]['expense'] : 0}</div>
                                            </Table.Cell>);
                                        } else {
                                            return (<Table.Cell key={theDay}></Table.Cell>);
                                        }
                                    })}
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </>
    );
}

export default Month;