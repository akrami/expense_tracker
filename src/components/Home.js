import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

const Home = (props) => {


    return (
        <>
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h4" content="Total" className="fade" />
                    <Segment>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h4" content="Income vs Expense" className="fade" />
                    <Segment>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Header as="h4" content="History" className="fade" />
        <Segment>
        </Segment>
        </>)

}

export default Home;