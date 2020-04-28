import React from "react";
import { Table, Button, Icon, Label } from "semantic-ui-react";

const Week = props => {
    const { day, month, year, setDate, weekData } = props;
    const thisDay = new Date(year, month, day).getDay();
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let customData = [];
    if (Array.isArray(weekData) && weekData.length > 0) {
        weekData.forEach(each => {
            const tempDate = new Date(new Date(each.date).toLocaleString());
            customData[`${tempDate.toLocaleDateString()} ${tempDate.getHours()}`] = each.total;
        });
    }

    return (
        <Table id="week-table" compact="very">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan="8" textAlign="center" verticalAlign="middle">
                        <Button floated="left" onClick={() => setDate(new Date(year, month, day - 7))} icon labelPosition="left"><Icon name="left arrow" /> Previous Week</Button>

                        <Button floated="right" onClick={() => setDate(new Date(year, month, day + 7))} icon labelPosition="right">Next Week <Icon name="right arrow" /></Button>
                    </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell width={1} textAlign="center">Hour</Table.HeaderCell>
                    {Array(7).fill(null).map((_, index) => {
                        return (
                            <Table.HeaderCell width={2} textAlign="center" key={index}>
                                {weekDays[index]}
                                <div className="sub">{new Date(year, month, day + index - thisDay).toLocaleDateString()}</div>
                            </Table.HeaderCell>
                        );
                    })}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Array(24).fill(null).map((_, index) => {
                    return (
                        <Table.Row key={index}>
                            <Table.Cell className="index">{index}</Table.Cell>
                            {Array(7).fill(null).map((_, dindex) => {
                                if (customData[(new Date(year, month, day + dindex - thisDay).toLocaleDateString()) + " " + index]) {
                                    return (
                                        <Table.Cell key={dindex} textAlign="center">
                                            <Label size="tiny" circular color={customData[(new Date(year, month, day + dindex - thisDay).toLocaleDateString()) + " " + index] > 0 ? 'blue' : 'red'}>
                                                {customData[(new Date(year, month, day + dindex - thisDay).toLocaleDateString()) + " " + index]}
                                            </Label>
                                        </Table.Cell>
                                    );
                                } else {
                                    return (
                                        <Table.Cell key={dindex}></Table.Cell>
                                    );
                                }
                            })}
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
}

export default Week;