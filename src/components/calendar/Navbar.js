import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
    let location = useLocation();

    return(
        <Menu text>
                    <Menu.Item active={location.pathname==="/calendar" || location.pathname==="/calendar/"} link>
                        <Link to="/calendar/">Month</Link>
                    </Menu.Item>
                    <Menu.Item active={location.pathname==="/calendar/week"} link>
                        <Link to="/calendar/week">Week</Link>
                    </Menu.Item>
                    <Menu.Item active={location.pathname==="/calendar/day"} link>
                        <Link to="/calendar/day">Day</Link>
                    </Menu.Item>
                </Menu>
    )
}

export default Navbar;