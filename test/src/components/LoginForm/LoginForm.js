import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import './LoginForm.css';
import PropTypes from 'prop-types';
import _ from 'lodash';

class LoginForm extends Component {
    constructor () {
        super();
        this.state = {
            name: null,
            email: null,
            password: null,
            password2: null
        };
    }

    handleChangeName = (event) => {
        this.setState({name: event.target.value});
    };

    handleChangeEmail = (event) => {
        this.setState({email: event.target.value});
    };

    handleChangePassword = (event) => {
        this.setState({password: event.target.value});
    };

    handleChangePassword2 = (event) => {
        this.setState({password2: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.loginUser(this.state.email, this.state.password);
    };

    handleRegisterUser = (event) => {
        event.preventDefault();
        const { name, email, password, password2 } = this.state;
        if(_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(password) || _.isEmpty(password2)){
            console.error('one field is blank');
            return;
        } else if(!_.isEqual(password, password2)){
            console.error('passwords need to match');
        } else {
            this.props.registerUser(name,email,password,password2);
        }
    };

    changeScreen = (bool) => {
        this.props.changeLogin(bool);
    };

    renderRegister = () => {
        return (
            <>
                <form id={'registration-form'} onSubmit={this.handleRegisterUser}>
                    <TextField
                        className={'login-textfield'}
                        color={'primary'}
                        label={'Your Name'}
                        onChange={this.handleChangeName}/>
                    <TextField
                        className={'login-textfield'}
                        color={'primary'}
                        label={'Email'}
                        onChange={this.handleChangeEmail}/>
                    <TextField
                        className={'login-textfield'}
                        color={'primary'}
                        label={'Password'}
                        type='password'
                        onChange={this.handleChangePassword}/>
                    <TextField
                        className={'login-textfield'}
                        color={'primary'}
                        label={'Confirm Password'}
                        type='password'
                        onChange={this.handleChangePassword2}/>
                    <Button
                        className={'login-submit'}
                        variant='contained'
                        color={'primary'}
                        type='submit'>
                        Submit
                    </Button>
                </form>
                <div className={'toggle-login'} onClick={(e) => this.changeScreen(true)}>Go Back to Login</div>
            </>
        );
    }

    renderLogin = () => {
        const { email } = this.state;
        return (
            <>
                <form id={'login-form'} onSubmit={this.handleSubmit}>
                    <TextField
                        className={'login-textfield'}
                        color={'primary'}
                        label={'Email'}
                        defaultValue={email}
                        onChange={this.handleChangeEmail}/>
                    <TextField
                        className={'login-textfield'}
                        color={'primary'}
                        label={'Password'}
                        type='password'
                        onChange={this.handleChangePassword}/>
                    <Button
                        className={'login-submit'}
                        variant='contained'
                        color={'primary'}
                        type='submit'>
                        Submit
                    </Button>
                </form>
                <div className={'toggle-login'} onClick={(e) => this.changeScreen(false)}>Are you a New User? Register
                    here
                </div>
            </>
        );
    };

    render () {
        const { showLogin } = this.props;
        return (
            <>
                { showLogin && this.renderLogin()}
                { !showLogin && this.renderRegister()}
            </>
        );
    }
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    changeLogin: PropTypes.func.isRequired,
    showLogin: PropTypes.bool
};

LoginForm.defaultProps = {
    showLogin: true
}

export default LoginForm;