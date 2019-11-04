import React, { Component } from 'react';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import './AddNew.css';
import Button from '@material-ui/core/Button';

class AddNew extends Component {

    state ={
        review: null,
        restaurantName: null,
        rank: null
    }

    onChangeReview = (e) => {
        let review = e.target.value;
        if (review.length > 3) {
            this.setState({review: review});
        }
    }

    onChangeTitle = (e) => {
        let name = e.target.value;
        if (name.length > 3) {
            this.setState({restaurantName: name});
        }
    }

    setRank = (e) => {
        const rank = Number(e.target.value);
        console.log('rank:',rank);
        this.setState({rank:rank});
    }

    submitData = (e) => {
        const { restaurantName, review, rank } = this.state;
        this.props.submit(restaurantName,review,rank);
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
        const { rank } = this.state;
        return (
            <div id={'add-new-container'}>
                <div>
                    <input
                        type='text'
                        onChange={(e) => this.onChangeTitle(e)}
                        placeholder='restaurant title'
                    />

                    <input
                        type='text'
                        onChange={(e) => this.onChangeReview(e)}
                        placeholder='Your Review'
                    />
                    <Button variant='contained' color='primary' onClick={() => this.submitData()}>
                        ADD
                    </Button>
                </div>
                <div>
                    <Rating size={'small'} name='half-rating' value={rank} precision={0.5} onClick={(e)=> this.setRank(e)}/>
                </div>
            </div>
        );
    }
}

AddNew.propTypes = {
    submit: PropTypes.func.isRequired
};

export default AddNew;



