import React, { Component } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import _ from 'lodash';
import './EditModal.css';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';

import { Cancel } from '@material-ui/icons';

class EditModal extends Component {

    constructor () {
        super();
        this.state = {
            restaurantName: null,
            review: null,
            price: 0,
            quality: 0,
            speed: 0
        };
    }

    shouldComponentUpdate (nextProps, nextState, nextContext) {
       if(!_.isEqual(nextProps,  this.props)) {
           if(!_.isEmpty(nextProps.data)){
               this.setState({
                   price: nextProps.data.rank.price,
                   speed: nextProps.data.rank.speed,
                   quality: nextProps.data.rank.quality,
                   restaurantName: nextProps.data.restaurant_name,
                   review: nextProps.data.review
               });
           }
       }
       return true;
    }

    cancel = () => {
        this.props.handleClose();
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

    setRating = (e) => {
        if (e.target.name) {
            this.setState({[e.target.name]: Number(e.target.value)});
        }
    };

    submitData = (e) => {
        const {restaurantName, review, price, quality, speed} = this.state;
        const rank = {
            price: price,
            quality: quality,
            speed: speed,
            rating: (price + quality + speed) / 3
        };
        this.props.submit(this.props.data._id, restaurantName, review, rank);
    };

    render () {
        const {handleClose, open, data} = this.props;
        const {price, quality, speed} = this.state;
        const noData = _.isEmpty(data);
        return (
            <Modal
                id={'edit-modal'}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={open}
                onClose={handleClose}
            >

                <div id={'modal-container'}>
                    {!noData &&
                    <div id={'edit-review-container'}>
                        <div id={'edit-review-header'}>
                            <h2>Edit a Review</h2>
                            <Cancel className={'cancel-button'} onClick={(e) => this.cancel(e)}/>
                        </div>
                        <div>
                            <div className={'rating-container'}>
                                <TextField
                                    className={'rating-text-field'}
                                    color={'primary'}
                                    onChange={(e) => this.onChangeTitle(e)}
                                    defaultValue={data.restaurant_name}
                                />
                            </div>
                            <div className={'rating-container'}>
                                <TextField
                                    className={'rating-review-field'}
                                    defaultValue={data.review}
                                    multiline
                                    rows={8}
                                    onChange={(e) => this.onChangeReview(e)}
                                    label={'Your Review'}
                                />
                            </div>
                        </div>
                        <div className={'rating-container'}>
                            <div className={'rating-label'}>Price:</div>
                            <Rating size={'small'} name='price' value={price} precision={0.5}
                                    onClick={(e) => this.setRating(e)}/>
                        </div>
                        <div className={'rating-container'}>
                            <div className={'rating-label'}>Speed:</div>
                            <Rating size={'small'} name='speed' value={speed} precision={0.5}
                                    onClick={(e) => this.setRating(e)}/>
                        </div>
                        <div className={'rating-container'}>
                            <div className={'rating-label'}>Quality:</div>
                            <Rating size={'small'} name='quality' value={quality} precision={0.5}
                                    onClick={(e) => this.setRating(e)}/>
                        </div>
                        <div className={'rating-container'}>
                            <Button variant='contained' color='primary' onClick={() => this.submitData()}>
                                ADD
                            </Button>
                        </div>
                    </div>
                    }
                    {noData && <h1>No Data</h1>}
                </div>


            </Modal>
        );
    }
}

EditModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    data: PropTypes.object,
    submit: PropTypes.func.isRequired
};

export default EditModal;