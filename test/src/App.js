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
        message: null,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
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
        const { message } = this.state;

        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        if(message !== '' || message.length > 3) {
            this.props.actions.addData(message, idToBeAdded);
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

    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        idToUpdate = parseInt(idToUpdate);
        this.state.data.forEach((dat) => {
            if (dat.id === idToUpdate) {
                objIdToUpdate = dat._id;
            }
        });
        this.props.actions.updateData(objIdToUpdate);
    };

    onChangeDelete =(e)=>{
        let changeId = e.target.value;
        console.log('changeId:',changeId);
        this.setState({ idToDelete: changeId });
    }

    onChangeAdd = (e) => {
        let message = e.target.value;
        if (message.length > 3) {
            this.setState({message: message});
        }
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
                                ? 'NO DB ENTRIES YET'
                                : data.map((reviewObj, index) => {

                                    return (
                                        <li style={{ padding: '10px' }} key={index}>
                                            <span style={{ color: 'gray' }}> id: </span> {reviewObj.id} <br />
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
                                onChange={(e) => this.setState({ idToUpdate: e.target.value })}
                                placeholder="id of item to update here"
                            />
                            <input
                                type="text"
                                style={{ width: '200px' }}
                                onChange={(e) => this.setState({ updateToApply: e.target.value })}
                                placeholder="put new value of the item here"
                            />
                            <Button variant="contained" color="primary"
                                onClick={() =>
                                    this.updateDB(this.state.idToUpdate, this.state.updateToApply)
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
