import React, { Component } from 'react';
import { AccessAlarm, AttachMoney, Fastfood, Delete, Edit } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';

import _ from 'lodash';

class ReviewListItem extends Component {

    getReviewColor = (rank) => {
        let color;
        if (rank > -1 && rank <= 2) {
            color = 'bad';
        } else if (rank > 2 && rank < 4) {
            color = 'ok';
        } else {
            color = 'good';
        }
        return color;
    };

    handleEdit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { openEditModal, reviewObj} = this.props;
        openEditModal(reviewObj);
    }

    handleDelete = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {reviewObj, deleteReview, deleteRestaurant, isMyReview} = this.props;
        if(isMyReview) {
            deleteReview(reviewObj._id)
        } else {
            deleteRestaurant(reviewObj.restaurant_name);
        }
    }

    handleOpenModal = (object) => {
        this.props.openModal(object);
    }

    render () {
        const {
            index,
            reviewObj,
            price, quality,
            speed,
            rating,
            total,
            isEditMode,
            isMyReview
        } = this.props;

        const canOpenModal = _.isFunction(this.props.openModal);
        const liClassName = 'review-item' + (canOpenModal ? ' show-pointer' : '');
        return (
            <li className={liClassName} onClick={canOpenModal ? (e)=>this.handleOpenModal(reviewObj) : null} key={index}>
                <div className={'review-item-meta'}>
                    <div className={'review-item-meta-restaurant-name'}>{reviewObj.restaurant_name}</div>
                    <div className={'review-item-meta-review'}>{reviewObj.review}</div>
                    <div
                        className={'review-item-meta-review-date'}>{moment(reviewObj.createdAt).format('MMMM Do YYYY')}</div>
                </div>
                <div className={'review-container'}>
                    <div className={'review-container-holder'}>
                        <div className={'review-icon-holder ' + this.getReviewColor(price)}>
                            <div className={'review-icon'}><AttachMoney className={'attach-money-icon'}/></div>
                            <div className={'review-icon-value'}>{price}</div>
                        </div>
                        <div className={'review-icon-holder ' + this.getReviewColor(quality)}>
                            <div className={'review-icon'}><Fastfood className={'fastfood-icon'}/></div>
                            <div className={'review-icon-value'}>{quality}</div>
                        </div>
                        <div className={'review-icon-holder ' + this.getReviewColor(speed)}>
                            <div className={'review-icon'}><AccessAlarm className={'access-alarm-icon'}/></div>
                            <div className={'review-icon-value'}>{speed}</div>
                        </div>
                    </div>
                    <div className={'rating-holder'}>
                        <Rating readOnly={true} size={'medium'} name='rating' value={Number(rating)} precision={0.5}/>
                    </div>
                    { canOpenModal && <div className={'review-totals'}>Total Reviews: {total}</div>}
                </div>
                { isEditMode &&
                    <div className={'edit-container'}>
                        <Delete onClick={(e)=>this.handleDelete(e)} />
                        { isMyReview && <Edit onClick={(e)=>this.handleEdit(e)}/>}
                    </div>
                }
            </li>
        );
    }
}

ReviewListItem.propTypes = {
    openModal: PropTypes.func,
    index: PropTypes.number,
    reviewObj: PropTypes.object,
    price: PropTypes.string,
    quality: PropTypes.string,
    speed: PropTypes.string,
    total: PropTypes.number,
    rating: PropTypes.string,
    isEditMode: PropTypes.bool,
    isMyReview: PropTypes.bool,
    deleteReview: PropTypes.func.isRequired,
    deleteRestaurant: PropTypes.func.isRequired,
    openEditModal: PropTypes.func.isRequired
};

export default ReviewListItem;
