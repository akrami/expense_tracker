import React from "react";
import { Button, Table, Icon, Header } from "semantic-ui-react";

const Month = props => {
    const { month, year, setDate } = props

    const startDayOfMonth = new Date(year, month, 1).getDay();
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augist', 'September', 'October', 'November', 'December'];
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const days = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
                                        const temp = (weekIndex * 7 + dayIndex) - startDayOfMonth + 1;
                                        return (<Table.Cell key={dayIndex}>{(temp > 0 && temp <= days[month]) ? <div className="ui circular label">{temp}</div> : ''}</Table.Cell>);
                                    })}
                                </Table.Row>
                            )
                            // return (<div key={index}>{index}:{index - startDayOfMonth + 1}:{weekDays[index % 7]}</div>)
                        })
                    }
                </Table.Body>
            </Table>
        </>
    );
}

export default Month;