import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {AddCircleOutline} from '@material-ui/icons';
import { Paper, Grid } from '@material-ui/core';

import {
    fetchData,
    deleteData,
    updateData,
    addData
} from './actions/dataActions';

import {
    registerUser,
    loginUser
} from './actions/usersActions';

import {
    MY_REVIEWS,
    ALL_RESTAURANTS
} from './constants/constants';

import _ from 'lodash';

import ReviewList from './components/ReviewList/ReviewList';
import AddNew from './components/AddNew/AddNew';
import LoginForm from './components/LoginForm/LoginForm';
import MainMenu from './components/MainMenu/MainMenu';

import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            data: [],
            id: 0,
            review: null,
            reviewTitle: null,
            idToDelete: null,
            idToUpdate: null,
            updateReview: null,
            updateName: null,
            showAddNew: true,
            showReviewList: true,
            isLoggedIn: false,
            listName: ALL_RESTAURANTS
        }
    }

    componentDidMount() {
        if(!_.isEmpty(localStorage.getItem('userId'))){
            this.setState({isLoggedIn:true},()=>{
                this.getDataFromDb();
            });
        }
    }

    componentWillUnmount() {

    }

    shouldComponentUpdate (nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate')
        if(!_.isEqual(this.props.DataStore, nextProps.DataStore)){
            console.log('nextProps.DataStore:',nextProps.DataStore);
            this.setState({
                data: nextProps.DataStore.data,
                showAddNew: nextProps.DataStore.data.length === 0
            });
        }
        if(!_.isEqual(this.props.UserStore, nextProps.UserStore)){
            console.log('user store!!!!!');
            console.log('nextProps.UserStore:',nextProps.UserStore);
            this.setState({isLoggedIn: nextProps.UserStore.isLoggedIn});
            // copy userId to local storage
            localStorage.setItem('userId',nextProps.UserStore.userId);
            // get data
            this.getDataFromDb();
        }
        return true;
    }

    logout = () => {
        this.setState({isLoggedIn: false},()=>{
            localStorage.setItem('userId', '');
        });
    }

    setType = (type) => {
        this.setState({listName:type},()=>{
            // get data
            this.getDataFromDb();
        });
    }

    getDataFromDb = () => {
        console.log('===> getDataFromDb');
        console.log('this.state.listName:',this.state.listName);
        if (this.state.listName === MY_REVIEWS){
            this.setState({listName: MY_REVIEWS},()=>{
                console.log('localStorage.getItem(\'userId\'):',localStorage.getItem('userId'));
                this.props.actions.fetchData(localStorage.getItem('userId'));
            });
        } else {
            this.setState({listName: ALL_RESTAURANTS},()=>{
                this.props.actions.fetchData();
            });
        }
    };

    addToDB = (name, review, rank) => {
        console.log('addToDB');
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        let userId = localStorage.getItem('userId');
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        if(review !== '' || review.length > 3) {
            this.props.actions.addData(name, review, rank, idToBeAdded, userId);
            this.setState({
                showAddNew:false,
            });
        } else {
            console.error('You need to have 3 characters at least in a review.')
        }
    };

    deleteFromDB = (id) => {
        console.log('deleteFromDb id:',id);
        id = parseInt(id);
        let objIdToDelete = null;
        console.log('this.state.data:',this.state.data);
        this.state.data.forEach((review) => {
            console.log('review.id:',review.id);
            if (parseInt(review.id) === id) {
                objIdToDelete = review._id;
            }
        });
        console.log('objIdToDelete:',objIdToDelete);
        //
        this.props.actions.deleteData(objIdToDelete);

    };

    updateDB = () => {
        const { updateReview, updateName } = this.state;
        const updateId = parseInt(this.state.idToUpdate);

        let objIdToUpdate = null;
        this.state.data.forEach((review) => {
            if (review.id === updateId) {
                objIdToUpdate = review._id;
            }
        });
        this.props.actions.updateData(updateReview, updateName, objIdToUpdate, updateId);
    };

    onChangeDelete =(e)=>{
        let changeId = e.target.value;
        this.setState({ idToDelete: changeId });
    }

    onChangeUpdateId = (e) => {
        this.setState({ idToUpdate: e.target.value });
    }

    onChangeUpdateMsg = (e) => {
        this.setState({ updateReview: e.target.value });
    }

    onChangeUpdateRestaurant = (e) => {
        this.setState({ updateName: e.target.value });
    }

    toggleAddNew = (e) => {
        this.setState({showAddNew: !this.state.showAddNew});
    }

    cancelAddNew = (e) => {
        this.setState({showAddNew: false});
    }

    loginUser = (email,password) => {
        console.log('loginUser:',email,password);
        this.props.actions.loginUser(email,password);
    }

    renderAddNew = () => {
        return (
            <AddNew
                submit={this.addToDB}
                cancel={this.cancelAddNew}
            >
            </AddNew>
        )
    }

    renderReviewList = () => {
        const { data, listName } = this.state;
        return (<ReviewList type={listName} data={data}></ReviewList>);
    }

    renderLogin = () => {

        return (<LoginForm loginUser={this.loginUser}></LoginForm>);
    }

    render() {
        const { showAddNew, showReviewList, isLoggedIn } = this.state;
        return (
            <div className='App'>
                <header className='App-header'>
                    <Grid className={'main-grid'} container spacing={0}>
                        <Grid className={'main-grid-container'} item xs={8} sm={8} md={8} lg={8}>
                            <Paper square={true} className="edit-video-left-tab" elevation={0}>
                                <h1>Welcome to Restaurant-O!</h1>
                                { isLoggedIn && !showAddNew &&
                                    <div id={'add-review-container'}>
                                        <div id={'main-menu-holder'}>
                                            <MainMenu
                                                logout={this.logout}
                                                setType={this.setType}
                                            ></MainMenu>
                                        </div>
                                        <div id={'add-review-holder'}>
                                            <div>Add a New Review</div>
                                            <AddCircleOutline onClick={ (e) => this.toggleAddNew(e) } />
                                        </div>
                                    </div>
                                }
                                { !isLoggedIn && this.renderLogin()}
                                { isLoggedIn && showAddNew && this.renderAddNew() }
                                { isLoggedIn && showReviewList && this.renderReviewList() }
                            </Paper>
                        </Grid>
                    </Grid>
                </header>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        DataStore: state.DataStore,
        UserStore: state.UserStore
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({
            fetchData,
            updateData,
            deleteData,
            addData,
            loginUser,
            registerUser
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
