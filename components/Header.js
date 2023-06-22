import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../route';

export default () => {
    return(
        <Menu style={{ marginTop: '20px' }}>
            <Menu.Item>
                <Link legacyBehavior route = "/">
                   <a className='item'>Home</a>
                </Link>   
            </Menu.Item>
            <Menu.Item>
                <Link legacyBehavior route = "/add">
                    <a className='item'>Add</a>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link legacyBehavior route = "/scan">
                    <a className='item'>Scan</a>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link legacyBehavior route = "/addm">
                    <a className='item'>Add Manufacturer</a>
                </Link>
            </Menu.Item>
        </Menu>
    );
};