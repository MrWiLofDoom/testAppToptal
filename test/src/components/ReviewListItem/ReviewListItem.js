import React, { Component } from 'react';
import { AccessAlarm, AttachMoney, Fastfood } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';

class ReviewListItem extends Component {

    getReviewColor = (rank) => {
        console.log('getReviewColor:', rank);
        let color;
        if (rank > -1 && rank <= 2) {
            color = 'bad';
        } else if (rank > 2 && rank < 4) {
            color = 'ok';
        } else {
            color = 'good';
        }
        console.log('color:', color);
        return color;
    };

    render () {
        const {index, reviewObj, price, quality, speed, rating} = this.props;
        console.log('this.props:', this.props);
        return (
            <li className={'review-item'} key={index}>
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
                        <Rating readOnly={true} size={'medium'} name='rating' value={rating} precision={0.5}/>
                    </div>
                </div>
            </li>
        );
    }
}

ReviewListItem.propTypes = {
    index: PropTypes.number,
    reviewObj: PropTypes.object,
    price: PropTypes.number,
    quality: PropTypes.number,
    speed: PropTypes.number,
    rating: PropTypes.number
};

export default ReviewListItem;
