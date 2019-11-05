import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import './LoginForm.css';
import PropTypes from 'prop-types';

class LoginForm extends Component {
    constructor () {
        super();
        this.state = {
            email: null,
            password: null
        };
    }

    handleChangeEmail = (event) => {
        this.setState({email: event.target.value});
    };

    handleChangePassword = (event) => {
        this.setState({password: event.target.value});
    };

    handleSubmit = (event) => {
        //Make a network call somewhere
        event.preventDefault();
        this.props.loginUser(this.state.email, this.state.password)
    };

    registerUser = (event) => {
        event.preventDefault();
        console.log('registerUser!!');
    };

    render () {
        return (
            <>
                <form id={'login-form'} onSubmit={this.handleSubmit}>
                    <TextField
                        className={'login-textfield'}
                        color={'primary'}
                        label={'Email'}
                        onChange={this.handleChangeEmail}/>
                    <TextField
                        className={'login-textfield'}
                        color={'primary'}
                        label={'Password'}
                        onChange={this.handleChangePassword}/>
                    <Button
                        className={'login-submit'}
                        variant='contained'
                        color={'primary'}
                        type='submit'>
                        Submit
                    </Button>
                </form>
                <div className={'register-user'} onClick={(e) => this.registerUser(e)}>Are you a New User? Register
                    here
                </div>
            </>
        );
    }
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default LoginForm;