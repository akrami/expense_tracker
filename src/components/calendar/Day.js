import React from "react";
import { Segment, Header, Button, Icon, Table, Label } from "semantic-ui-react";

const Day = props => {
    const { day, month, year, setDate, dayData } = props;
    const theDay = new Date(year, month, day, 0, 0, 0, 0);
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augist', 'September', 'October', 'November', 'December'];

    return (
        <>
            <Segment textAlign="center" clearing>

                <Button floated="left" onClick={() => { setDate(new Date(year - 1, month, day)) }} icon labelPosition="left"><Icon name="left arrow" /> {year - 1}</Button>
                <Button floated="left" onClick={() => { setDate(new Date(year, month - 1, day)) }} icon labelPosition="left"><Icon name="left arrow" /> {months[month === 0 ? 11 : month - 1]}</Button>
                <Button floated="left" onClick={() => { setDate(new Date(year, month, day - 1)) }} icon labelPosition="left"><Icon name="left arrow" /> Yesterday</Button>
                <Button secondary onClick={() => { setDate(new Date()) }}>Today</Button>
                <Button floated="right" onClick={() => { setDate(new Date(year + 1, month, day)) }} icon labelPosition="right">{year + 1} <Icon name="right arrow" /></Button>
                <Button floated="right" onClick={() => { setDate(new Date(year, month + 1, day)) }} icon labelPosition="right">{months[month === 11 ? 0 : month + 1]} <Icon name="right arrow" /></Button>
                <Button floated="right" onClick={() => { setDate(new Date(year, month, day + 1)) }} icon labelPosition="right">Tomorrow <Icon name="right arrow" /></Button>

            </Segment>

            <Segment textAlign="center" clearing>
                <Header as="h2">{theDay.toLocaleDateString()}, {weekDays[theDay.getDay()]}</Header>
            </Segment>

            <Table basic="very">
                <Table.Body>
                    {
                        (Array.isArray(dayData) && dayData.length > 0) ?
                            dayData.map(expense => {
                                return (
                                    <Table.Row key={expense._id}>
                                        <Table.Cell><Label horizontal color={expense.amount > 0 ? "blue" : "orange"}>{expense.category}</Label> {expense.description}</Table.Cell>
                                        <Table.Cell className={expense.amount > 0 ? "positive" : "negative"}>{expense.amount > 0 ? "+" : ""}{expense.amount}<Icon name="dollar" /></Table.Cell>
                                        <Table.Cell textAlign="right">
                                            {new Date(expense.when).toLocaleDateString()} <span className="fade">{(new Date(expense.when)).toLocaleTimeString()}</span>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }
                            ) :
                            <Table.Row>
                                <Table.Cell textAlign="center">No Data Available</Table.Cell>
                            </Table.Row>}
                </Table.Body>
            </Table>
        </>
    );
}

export default Day;