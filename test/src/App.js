import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import { fetchData, deleteData, updateData, addData } from './actions/dataActions';

import _ from 'lodash';

import ReviewList from './components/ReviewList/ReviewList';
import AddNew from './components/AddNew/AddNew';

import './App.css';

class App extends Component {

    state = {
        data: [],
        id: 0,
        review: null,
        reviewTitle: null,
        idToDelete: null,
        idToUpdate: null,
        updateReview: null,
        updateName: null,
        showAddNew: false
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    componentWillUnmount() {

    }

    shouldComponentUpdate (nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate')
        if(!_.isEqual(this.props.DataStore, nextProps.DataStore)){
            console.log('nextProps.DataStore:',nextProps.DataStore);
            this.setState({data: nextProps.DataStore.data});
        }
        return true;
    }

    getDataFromDb = () => {
        this.props.actions.fetchData();
    };

    addToDB = (name, review, rank) => {

        console.log('addToDB');
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        if(review !== '' || review.length > 3) {
            this.props.actions.addData(name, review, rank, idToBeAdded);
            this.setState({showAddNew:false});
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
        console.log('updateId:',updateId);
        let objIdToUpdate = null;
        this.state.data.forEach((review) => {
            console.log('review:',review);
            if (review.id === updateId) {
                console.log('=== set objIdToUpdate');
                objIdToUpdate = review._id;
            }
        });
        console.log('*** objIdToUpdate:',objIdToUpdate);
        this.props.actions.updateData(updateReview, updateName, objIdToUpdate, updateId);
    };

    onChangeDelete =(e)=>{
        let changeId = e.target.value;
        console.log('changeId:',changeId);
        this.setState({ idToDelete: changeId });
    }

    onChangeUpdateId = (e) => {
        console.log('onChangeUpdateId:',e.target.value);
        this.setState({ idToUpdate: e.target.value });
    }

    onChangeUpdateMsg = (e) => {
        console.log('onChangeUpdateMsg:',e.target.value);
        this.setState({ updateReview: e.target.value });
    }

    onChangeUpdateRestaurant = (e) => {
        console.log('onChangeUpdateMsg:',e.target.value);
        this.setState({ updateName: e.target.value });
    }

    toggleAddNew = (e) => {
        this.setState({showAddNew: !this.state.showAddNew});
    }

    renderAddNew = () => {
        return (
            <AddNew submit={this.addToDB}></AddNew>
        )
    }

    renderReviewList = () => {
        const { data } = this.state;
        return (<ReviewList data={data}></ReviewList>);
    }

    render() {
        const { showAddNew } = this.state;
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1>Welcome to Restaurant-O!</h1>
                    <div>
                        { !showAddNew &&
                            <AddCircleOutline onClick={ (e) => this.toggleAddNew(e) } />
                        }
                        { showAddNew && this.renderAddNew() }
                        { this.renderReviewList() }
                    </div>
                </header>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        DataStore: state.DataStore
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({
            fetchData,
            updateData,
            deleteData,
            addData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
