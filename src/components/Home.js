import React from 'react';
import { Grid, Header, Table, Label, Icon } from 'semantic-ui-react';
import Total from './home/Total';
import Tops from './home/Tops';

const Home = props => {
    const { expenses, total, days, tops, update, setUpdate } = props;

    const removeExpense = (id) => {
        fetch("http://localhost:9090/api/expenses/" + id, {
            method: 'DELETE'
        }).then(() => setUpdate(!update));
    }

    return (
        <>
            <Grid columns={2} stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Total total={total} days={days} />
                    </Grid.Column>
                    <Grid.Column>
                        <Tops tops={tops} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br />
            <Header as="h4" content="Last 20 Transactions" className="fade" />
            <Table>
                <Table.Body>
                    {expenses.map(expense => {
                        return (
                            <Table.Row key={expense._id}>
                                <Table.Cell className="expense"><Icon link bordered size="small" color="red" onClick={() => removeExpense(expense._id)} name="remove" /><Label horizontal color={expense.amount > 0 ? "blue" : "orange"}>{expense.category}</Label> {expense.description}</Table.Cell>
                                <Table.Cell className={expense.amount > 0 ? "positive" : "negative"}>{expense.amount > 0 ? "+" : ""}{expense.amount}<Icon name="dollar" /></Table.Cell>
                                <Table.Cell textAlign="right">
                                    {new Date(expense.when).toLocaleDateString()} <span className="fade">{(new Date(expense.when)).toLocaleTimeString()}</span>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>)

}

export default Home;