import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AddCircleOutline } from '@material-ui/icons';
import { Paper, Grid } from '@material-ui/core';

import {
    fetchData,
    deleteData,
    updateData,
    addData,
    deleteRestaurant
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
import EditModal from './components/EditModal/EditModal';

import './App.css';

const initData = {
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
    modalData: null,
    isEditMode: false,
    editModalData: null,
    editModalOpen: false
}

class App extends Component {

    constructor () {
        super();
        this.state = initData;
    }

    componentDidMount () {
        if (!_.isEmpty(localStorage.getItem('userId'))) {
            this.setState({isLoggedIn: true}, () => {
                this.getDataFromDb();
            });
        }

        if (!_.isEmpty(localStorage.getItem('isEditMode'))) {
            let isEditMode = localStorage.getItem('isEditMode');
            this.setState({isEditMode: isEditMode === 'true'});
        }
    }

    shouldComponentUpdate (nextProps, nextState, nextContext) {
        if (!_.isEqual(this.props.DataStore, nextProps.DataStore)) {
            this.setState({
                data: nextProps.DataStore.data,
                showAddNew: nextProps.DataStore.data.length === 0
            });
        }
        if (!_.isEqual(this.props.UserStore, nextProps.UserStore)) {
            const isNowLoggedIn = nextProps.UserStore.isLoggedIn;
            this.setState({
                isLoggedIn: isNowLoggedIn,
                isEditMode: nextProps.UserStore.isEditMode
            }, () => {
                if (isNowLoggedIn) {
                    // copy userId to local storage
                    localStorage.setItem('userId', nextProps.UserStore.userId);
                    localStorage.setItem('isEditMode', nextProps.UserStore.isEditMode);
                    // get data
                    this.getDataFromDb();
                } else {
                    this.setState({email: nextProps.email}, () => {
                        this.changeLogin(true);
                    });
                }
            });
        }
        return true;
    }

    logout = () => {
        this.setState(initData, () => {
            localStorage.setItem('userId', '');
            localStorage.setItem('isEditMode', '');
        });
    };

    setType = (type) => {
        this.setState({listName: type}, () => {
            // get data
            this.getDataFromDb();
        });
    };

    getDataFromDb = () => {
        if (this.state.listName === MY_REVIEWS) {
            this.setState({listName: MY_REVIEWS}, () => {
                this.props.actions.fetchData(localStorage.getItem('userId'));
            });
        } else {
            this.setState({listName: ALL_RESTAURANTS}, () => {
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

        if (review !== '' || review.length > 3) {
            this.props.actions.addData(name, review, rank, idToBeAdded, userId);
            this.setState({
                showAddNew: false
            });
        } else {
            console.error('You need to have 3 characters at least in a review.');
        }
    };

    deleteReview = (id) => {
        this.props.actions.deleteData(id, localStorage.getItem('userId'));
    };

    deleteRestaurantByName = (name) => {
        this.props.actions.deleteRestaurant(name);
    };

    editReview = (id, restaurantName, review, rank) => {
        this.closeEditModal();
        this.props.actions.updateData(review, restaurantName, id, rank, localStorage.getItem('userId'));
    };

    toggleAddNew = (e) => {
        this.setState({showAddNew: !this.state.showAddNew});
    };

    cancelAddNew = (e) => {
        this.setState({showAddNew: false});
    };

    changeLogin = (bool) => {
        this.setState({showLogin: bool});
    };

    loginUser = (email, password) => {
        this.props.actions.loginUser(email, password);
    };

    openModal = (data) => {
        this.setState({
            modalOpen: true,
            modalData: data
        });
    };

    openEditModal = (data) => {
        this.setState({
            editModalOpen: true,
            editModalData: data
        });
    };

    closeModal = () => {
        this.setState({modalOpen: false, modalData: null});
    };

    closeEditModal = () => {
        this.setState({editModalOpen: false, editModalData: null});
    };

    registerUser = (name, email, password, password2) => {
        this.props.actions.registerUser(name, email, password, password2);
    };

    renderModal = () => {
        const {modalOpen, modalData} = this.state;
        return (<MainModal
            handleClose={this.closeModal}
            open={modalOpen}
            data={modalData}
        ></MainModal>);
    };

    renderEditModal = () => {
        const {editModalOpen, editModalData} = this.state;
        return (<EditModal
            handleClose={this.closeEditModal}
            open={editModalOpen}
            data={editModalData}
            submit={this.editReview}
        ></EditModal>);
    };

    renderAddNew = () => {
        return (
            <AddNew
                submit={this.addToDB}
                cancel={this.cancelAddNew}
            >
            </AddNew>
        );
    };

    renderReviewList = () => {
        const {data, listName, isEditMode} = this.state;
        return (<ReviewList
            type={listName}
            data={data}
            openModal={this.openModal}
            openEditModal={this.openEditModal}
            isEditMode={isEditMode}
            deleteReview={this.deleteReview}
            deleteRestaurant={this.deleteRestaurantByName}
        >
        </ReviewList>);
    };

    renderLogin = () => {
        const {showLogin, email} = this.state;
        return (<LoginForm
            loginUser={this.loginUser}
            registerUser={this.registerUser}
            changeLogin={this.changeLogin}
            showLogin={showLogin}
            email={email}
        ></LoginForm>);
    };

    render () {
        const {showAddNew, showReviewList, isLoggedIn, isEditMode} = this.state;
        return (
            <div className='App'>
                <header className='App-header'>
                    <Grid className={'main-grid'} container spacing={0}>
                        <Grid className={'main-grid-container'} item xs={8} sm={8} md={8} lg={8}>
                            <Paper square={true} className='edit-video-left-tab' elevation={0}>
                                <h1>Welcome to Restaurant-O!</h1>
                                {isEditMode && <h4>EDIT MODE</h4>}
                                {isLoggedIn && !showAddNew &&
                                <div id={'add-review-container'}>
                                    <div id={'main-menu-holder'}>
                                        <MainMenu
                                            logout={this.logout}
                                            setType={this.setType}
                                        ></MainMenu>
                                    </div>
                                    <div id={'add-review-holder'}>
                                        <div>Add a New Review</div>
                                        <AddCircleOutline onClick={(e) => this.toggleAddNew(e)}/>
                                    </div>
                                </div>
                                }
                                {!isLoggedIn && this.renderLogin()}
                                {isLoggedIn && showAddNew && this.renderAddNew()}
                                {isLoggedIn && showReviewList && this.renderReviewList()}
                                {this.renderModal()}
                                {this.renderEditModal()}
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
            registerUser,
            deleteRestaurant
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
