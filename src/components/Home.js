import React from 'react';
import { Grid, Header, Segment, Statistic, Table, Label, Icon } from 'semantic-ui-react';

const Home = (props) => {
    const { expenses, total } = props;
    return (
        <>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h4" content="CASH" className="fade" />
                        <Segment>
                            <Statistic color={total > 0 ? 'blue' : 'red'}>
                                <Statistic.Value>{total}$</Statistic.Value>
                            </Statistic>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h4" content="FLOW" className="fade" />
                        <Segment>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Header as="h4" content="History" className="fade" />
            <Segment>
                <Table basic="very">
                    <Table.Body>
                        {expenses.map(expense => {
                            return (
                                <Table.Row key={expense._id}>
                                    <Table.Cell><Label horizontal color={expense.amount > 0 ? "blue" : "orange"}>{expense.category}</Label> {expense.description}</Table.Cell>
                                    <Table.Cell className={expense.amount > 0 ? "positive" : "negative"}>{expense.amount > 0 ? "+" : ""}{expense.amount}<Icon name="dollar" /></Table.Cell>
                                    <Table.Cell textAlign="right">
                                        {new Date(expense.when).toLocaleDateString()} <span className="fade">{(new Date(expense.when)).toLocaleTimeString()}</span>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </Segment>
        </>)

}

export default Home;