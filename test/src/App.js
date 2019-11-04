import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import { fetchData, deleteData, updateData, addData } from './actions/dataActions';

import _ from 'lodash';

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
        updateName: null
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

    addToDB = () => {
        const { review } = this.state;

        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        if(review !== '' || review.length > 3) {
            this.props.actions.addData(review, idToBeAdded);
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

    onChangeAdd = (e) => {
        let review = e.target.value;
        if (review.length > 3) {
            this.setState({review: review});
        }
    }

    onChangeAddTitle = (e) => {
        let reviewTitle = e.target.value;
        if (reviewTitle.length > 3) {
            this.setState({review: reviewTitle});
        }
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

    render() {
        const { data } = this.state;
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1>Welcome to Restaurant-O!</h1>
                    <div>
                        <ul>
                            {data.length <= 0
                                ? 'NO REVIEWS YET'
                                : data.map((reviewObj, index) => {

                                    return (
                                        <li style={{ padding: '10px' }} key={index}>
                                            <span style={{ color: 'gray' }}> id: </span> {reviewObj.id}
                                            <span style={{ color: 'gray' }}> restaurant: </span> {reviewObj.restaurant_name}
                                            <span style={{ color: 'gray' }}> review: </span>
                                            {reviewObj.review}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div style={{ padding: '10px' }}>
                            <input
                                type="text"
                                onChange={(e) => this.onChangeAddTitle(e) }
                                placeholder="restaurant title"
                                style={{ width: '200px' }}
                            />

                            <input
                                type="text"
                                onChange={(e) => this.onChangeAdd(e) }
                                placeholder="add something in the database"
                                style={{ width: '200px' }}
                            />
                            <Button variant="contained" color="primary" onClick={() => this.addToDB()}>
                                ADD
                            </Button>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <input
                                type="text"
                                style={{ width: '200px' }}
                                onChange={(e) => this.onChangeDelete(e) }
                                placeholder="put id of item to delete here"
                            />
                            <Button variant="contained" color="primary" onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                                DELETE
                            </Button>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <input
                                type="text"
                                style={{ width: '200px' }}
                                onChange={(e) => this.onChangeUpdateId(e)}
                                placeholder="id of item to update here"
                            />
                            <input
                                type="text"
                                style={{ width: '200px' }}
                                onChange={(e) => this.onChangeUpdateRestaurant(e)}
                                placeholder="put new value of restaurant name here"
                            />
                            <input
                                type="text"
                                style={{ width: '200px' }}
                                onChange={(e) => this.onChangeUpdateMsg(e)}
                                placeholder="put new value of the item here"
                            />
                            <Button variant="contained" color="primary"
                                onClick={() =>
                                    this.updateDB()
                                }
                            >
                                UPDATE
                            </Button>
                        </div>
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
