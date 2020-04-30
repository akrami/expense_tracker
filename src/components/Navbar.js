import React, { useState } from 'react';
import { Menu, Container, Header, Icon, Modal, Form, Button, Search } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = props => {
    const { newExpenseHandler, categories } = props;

    const convertCategories = (categories) => {
        let convertedCategories = [];
        categories.forEach(category => convertedCategories.push({ title: category }));
        return convertedCategories
    }

    let location = useLocation();
    const now = new Date();
    const datetime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    const [modal, setModal] = useState(false);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [when, setWhen] = useState(datetime);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchSelect = (e, { result }) => setCategory(result.title);
    const handleSearchChange = e => {
        setSearchLoading(true);
        setSearchResults(convertCategories(categories.filter(category => category.toLowerCase().includes(e.target.value.toLowerCase()))));
        setCategory(e.target.value);
        setSearchLoading(false);
    }

    return (
        <>
            <Menu className="main-navbar">
                <Container>
                    <Menu.Item header>
                        <Header as="h3" content="Expense Tracker" />
                    </Menu.Item>
                    <Link to="/" className={location.pathname === '/' ? 'item active' : 'item'}><Icon name="warehouse" /> Home</Link>
                    <Link to="/calendar" className={location.pathname.startsWith("/calendar") ? 'item active' : 'item'}><Icon name="calendar alternate outline" /> Calendar</Link>
                    <Menu.Item position="right" link onClick={() => { setModal(true); setWhen(datetime) }}>
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
                            <Search loading={searchLoading} onResultSelect={handleSearchSelect} onSearchChange={handleSearchChange} results={searchResults} value={category} />
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
                    <Button type="Submit" primary onClick={() => {
                        newExpenseHandler({
                            category,
                            description,
                            amount,
                            when
                        });
                        setCategory('');
                        setDescription('');
                        setAmount(0);
                        setWhen(datetime);
                        setModal(false);
                    }}><Icon name="add" /> Add</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

export default Navbar;