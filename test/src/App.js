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
import MainModal from './components/MainModal/MainModal';

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
            showLogin: true,
            listName: ALL_RESTAURANTS,
            email: null,
            modalOpen: false,
            modalData: null
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
        if(!_.isEqual(this.props.DataStore, nextProps.DataStore)){
            this.setState({
                data: nextProps.DataStore.data,
                showAddNew: nextProps.DataStore.data.length === 0
            });
        }
        if(!_.isEqual(this.props.UserStore, nextProps.UserStore)){
            const isNowLoggedIn = nextProps.UserStore.isLoggedIn;
            this.setState({isLoggedIn: isNowLoggedIn},()=>{
                if(isNowLoggedIn) {
                    // copy userId to local storage
                    localStorage.setItem('userId', nextProps.UserStore.userId);
                    // get data
                    this.getDataFromDb();
                } else {
                    this.setState({email: nextProps.email},()=>{
                        this.changeLogin(true);
                    });
                }
            });
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
        if (this.state.listName === MY_REVIEWS){
            this.setState({listName: MY_REVIEWS},()=>{
                this.props.actions.fetchData(localStorage.getItem('userId'));
            });
        } else {
            this.setState({listName: ALL_RESTAURANTS},()=>{
                this.props.actions.fetchData();
            });
        }
    };

    addToDB = (name, review, rank) => {
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
        id = parseInt(id);
        let objIdToDelete = null;
        this.state.data.forEach((review) => {
            if (parseInt(review.id) === id) {
                objIdToDelete = review._id;
            }
        });
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

    changeLogin = (bool) => {
        this.setState({showLogin: bool})
    }

    loginUser = (email,password) => {
        console.log('loginUser:',email,password);
        this.props.actions.loginUser(email,password);
    }

    openModal = (data) => {
        console.log('--> openModal:',data);
        this.setState({
            modalOpen: true,
            modalData: data
        });
    }

    closeModal = () => {
        console.log('I am closeModal');
        this.setState({modalOpen: false, modalData: null});
    }

    registerUser = (name,email,password,password2) => {
        console.log('registerUser:',name,email,password,password2);
        this.props.actions.registerUser(name, email, password, password2);
    }
    
    renderModal = () => {
        console.log('renderModal');
        const {modalOpen, modalData} = this.state;
        return (<MainModal
            handleClose={this.closeModal}
            open={modalOpen}
            data={modalData}
        ></MainModal>);
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
        return (<ReviewList
            type={listName}
            data={data}
            openModal={this.openModal}
        >
        </ReviewList>);
    }

    renderLogin = () => {
        const { showLogin, email } = this.state;
        return (<LoginForm
            loginUser={this.loginUser}
            registerUser={this.registerUser}
            changeLogin={this.changeLogin}
            showLogin={showLogin}
            email={email}
        ></LoginForm>);
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
                                { this.renderModal() }
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
