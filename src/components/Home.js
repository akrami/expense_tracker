import React from 'react';
import { Grid, Header, Segment, Table, Label, Icon } from 'semantic-ui-react';
import Total from './home/Total';

const Home = (props) => {
    const { expenses, total, days } = props;
    return (
        <>
            <Grid columns={2} stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Total total={total} days={days} />
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