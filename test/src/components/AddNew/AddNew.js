import React, { Component } from 'react';
import { Rating } from '@material-ui/lab';
import { TextField, Button } from '@material-ui/core';
import {Cancel} from '@material-ui/icons';

import PropTypes from 'prop-types';
import './AddNew.css';

class AddNew extends Component {

    state = {
        review: null,
        restaurantName: null,
        price: 0,
        quality: 0,
        speed: 0
    };

    onChangeReview = (e) => {
        let review = e.target.value;
        if (review.length > 3) {
            this.setState({review: review});
        }
    };

    onChangeTitle = (e) => {
        let name = e.target.value;
        if (name.length > 3) {
            this.setState({restaurantName: name});
        }
    };

    setRank = (e) => {
        console.log('setRank:', e.target.name);
        const rank = Number(e.target.value);
        console.log('rank:', rank);

        if(e.target.name){
            this.setState({[e.target.name]: Number(e.target.value)});
        }

    };

    submitData = (e) => {
        const {restaurantName, review, price, quality, speed} = this.state;
        const rank = {
            price: price,
            quality: quality,
            speed: speed,
            rating: (price+quality+speed)/3
        }
        this.props.submit(restaurantName, review, rank);
    };

    cancel = (e) => {
        this.props.cancel()
    }

    renderContent = () => {
        return (
            <>

                {/*<div>*/}
                {/*    <input*/}
                {/*        type='text'*/}
                {/*        onChange={(e) => this.onChangeDelete(e)}*/}
                {/*        placeholder='put id of item to delete here'*/}
                {/*    />*/}
                {/*    <Button variant='contained' color='primary'*/}
                {/*            onClick={() => this.deleteFromDB(this.state.idToDelete)}>*/}
                {/*        DELETE*/}
                {/*    </Button>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <input*/}
                {/*        type='text'*/}
                {/*        onChange={(e) => this.onChangeUpdateId(e)}*/}
                {/*        placeholder='id of item to update here'*/}
                {/*    />*/}
                {/*    <input*/}
                {/*        type='text'*/}
                {/*        onChange={(e) => this.onChangeUpdateRestaurant(e)}*/}
                {/*        placeholder='put new value of restaurant name here'*/}
                {/*    />*/}
                {/*    <input*/}
                {/*        type='text'*/}
                {/*        onChange={(e) => this.onChangeUpdateMsg(e)}*/}
                {/*        placeholder='put new value of the item here'*/}
                {/*    />*/}
                {/*    <Button variant='contained' color='primary'*/}
                {/*            onClick={() =>*/}
                {/*                this.updateDB()*/}
                {/*            }*/}
                {/*    >*/}
                {/*        UPDATE*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </>
        );
    };

    render () {
        const {price, quality, speed} = this.state;
        return (
            <div id={'add-new-container'}>
                <div id={'add-new-header'}>
                    <h2>Add a New Review</h2>
                    <Cancel className={'cancel-button'} onClick={(e)=> this.cancel(e)}/>
                </div>
                <div>
                    <div className={'rating-container'}>
                        <TextField
                            className={'rating-text-field'}
                            color={'primary'}
                            onChange={(e) => this.onChangeTitle(e)}
                            label={'Enter your restaurant name'}
                        />
                    </div>
                    <div className={'rating-container'}>
                        <TextField
                            className={'rating-review-field'}
                            multiline
                            rows={8}
                            onChange={(e) => this.onChangeReview(e)}
                            label={'Your Review'}
                        />
                    </div>
                </div>
                <div className={'rating-container'}>
                    <div className={'rating-label'}>Price:</div>
                    <Rating size={'small'} name='price' value={price} precision={0.5} onClick={(e) => this.setRank(e)}/>
                </div>
                <div className={'rating-container'}>
                    <div className={'rating-label'}>Speed:</div>
                    <Rating size={'small'} name='speed' value={speed} precision={0.5} onClick={(e) => this.setRank(e)}/>
                </div>
                <div className={'rating-container'}>
                    <div className={'rating-label'}>Quality:</div>
                    <Rating size={'small'} name='quality' value={quality} precision={0.5}
                            onClick={(e) => this.setRank(e)}/>
                </div>
                <div className={'rating-container'}>
                    <Button variant='contained' color='primary' onClick={() => this.submitData()}>
                        ADD
                    </Button>
                </div>
            </div>
        );
    }
}

AddNew.propTypes = {
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
};

export default AddNew;



