import React from 'react';
import { Menu, Container, Header, Icon, Modal, Form, Button } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
    let location = useLocation();

    return (
        <Menu className="main-navbar">
            <Container>
                <Menu.Item header>
                    <Header as="h3" content="Expense Tracker" />
                </Menu.Item>
                {/* <Menu.Item active={location.pathname === "/"} link>
                    <Link to="/"><Icon name="warehouse" /> Home</Link>
                </Menu.Item>
                <Menu.Item active={location.pathname.startsWith("/calendar")} link>
                    <Link to="/calendar"><Icon name="calendar outline" /> Calendar</Link>
                </Menu.Item> */}
                <Link to="/" className={location.pathname === '/' ? 'item active' : 'item'}><Icon name="warehouse" /> Home</Link>
                <Link to="/calendar" className={location.pathname.startsWith("/calendar") ? 'item active' : 'item'}><Icon name="calendar alternate outline" /> Calendar</Link>
                <Menu.Item position="right" link>
                    <Modal trigger={<Icon size="large" name="add circle" />} dimmer="blurring">
                        <Modal.Header>Add new Expense</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>Category</label>
                                    <input placeholder="Category" />
                                </Form.Field>

                                <Form.Field>
                                    <label>Description</label>
                                    <input placeholder="Description" />
                                </Form.Field>

                                <Form.Field>
                                    <label>Amount</label>
                                    <input placeholder="Amount" type="number" />
                                </Form.Field>

                                <Form.Field>
                                    <label>When?</label>
                                    <input placeholder="When?" type="datetime-local" />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button type="Submit">Add</Button>
                        </Modal.Actions>
                    </Modal>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default Navbar;