import React, { useState } from 'react';
import { Menu, Container, Header, Icon, Modal, Form, Button } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = (props) => {
    let location = useLocation();
    const now = new Date();
    const datetime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    const [modal, setModal] = useState(false);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [when, setWhen] = useState(datetime);
    return (
        <>
            <Menu className="main-navbar">
                <Container>
                    <Menu.Item header>
                        <Header as="h3" content="Expense Tracker" />
                    </Menu.Item>
                    <Link to="/" className={location.pathname === '/' ? 'item active' : 'item'}><Icon name="warehouse" /> Home</Link>
                    <Link to="/calendar" className={location.pathname.startsWith("/calendar") ? 'item active' : 'item'}><Icon name="calendar alternate outline" /> Calendar</Link>
                    <Menu.Item position="right" link onClick={() => setModal(true)}>
                        <Icon size="large" name="add circle" />
                    </Menu.Item>
                </Container>
            </Menu>
            <Modal open={modal} onClose={() => setModal(false)} dimmer="blurring" closeOnDimmerClick={false}>
                <Modal.Header>Add new Expense</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Category</label>
                            <input placeholder="Category" value={category} onChange={event => setCategory(event.target.value)} />
                        </Form.Field>

                        <Form.Field>
                            <label>Description</label>
                            <input placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} />
                        </Form.Field>

                        <Form.Field>
                            <label>Amount</label>
                            <input placeholder="Amount" type="number" value={amount} onChange={event => setAmount(event.target.value)} />
                        </Form.Field>

                        <Form.Field>
                            <label>When?</label>
                            <input placeholder="When?" value={when} onChange={event => setWhen(event.target.value)} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={() => setModal(false)}>Cancel</Button>
                    <Button type="Submit" primary onClick={()=>{
                        const newExpense = {
                            '_id': Math.floor(Math.random()*1000000000),
                            category,
                            description,
                            amount,
                            when
                        }
                        props.onExpenseChange([newExpense, ...props.expenses]);
                        setModal(false);
                    }}><Icon name="add" /> Add</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

export default Navbar;