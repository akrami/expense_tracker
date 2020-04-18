import React from 'react';
import { Menu, Container, Header, Icon } from 'semantic-ui-react';
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
                <Link to="/" className={location.pathname==='/'?'item active':'item'}><Icon name="warehouse" /> Home</Link>
                <Link to="/calendar" className={location.pathname.startsWith("/calendar")?'item active':'item'}><Icon name="calendar alternate outline" /> Calendar</Link>
            </Container>
        </Menu>
    );
}

export default Navbar;