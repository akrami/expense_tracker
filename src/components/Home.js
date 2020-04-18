import React, { useState } from 'react';
import { Grid, Header, Segment, Statistic } from 'semantic-ui-react';

const Home = (props) => {
    const [total] = useState(2200);

    return (
        <>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h4" content="CASH" className="fade" />
                        <Segment>
                            <Statistic color={total>0?'blue':'red'}>
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
            </Segment>
        </>)

}

export default Home;