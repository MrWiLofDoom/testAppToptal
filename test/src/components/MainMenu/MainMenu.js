import React, { Component } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './MainMenu.css';
import PropTypes from 'prop-types';
import { ALL_RESTAURANTS, MY_REVIEWS } from '../../constants/constants';

class MainMenu extends Component {
    constructor () {
        super();

        this.state = {
            email: null,
            password: null,
            anchorEl: null
        };
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = (event) => {
        this.setState({anchorEl: null});
    };

    handleLogout = (event) => {
        this.props.logout();
        this.handleClose(event);
    }

    handleReviews = (event) => {
        this.props.setType(MY_REVIEWS);
        this.handleClose(event);
    }

    handleAllRestaurants = (event) => {
        this.props.setType(ALL_RESTAURANTS);
        this.handleClose(event);
    }

    render(){
        const { anchorEl } = this.state;
        return (
            <>
                <Button className={'main-menu-button'} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <MenuIcon className={'main-menu-icon'} />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleAllRestaurants}>All Restaurants</MenuItem>
                    <MenuItem onClick={this.handleReviews}>My Reviews</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
            </>
        )
    }
}

MainMenu.propTypes = {
    logout: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired
}

export default MainMenu;