import React, { Component } from 'react';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import './ReviewList.css';

class ReviewList extends Component {

    renderContent = (reviewObj, index) => {
        return (
            <li className={'review-item'} key={index}>
                <div className={'review-item-meta'}>
                    <div>id:  {reviewObj.id}</div>
                    <div>restaurant: {reviewObj.restaurant_name}</div>
                    <div>review: {reviewObj.review}</div>
                </div>
                <div>
                    <Rating readOnly size={'small'} name='half-rating' value={reviewObj.rank} precision={0.5}/>
                </div>
            </li>
        );
    };

    render () {
        const {data} = this.props;
        const newData = data.sort((a,b)=>(a.rank < b.rank) ? 1 : ((b.rank < a.rank) ? -1 : 0));
        return (
            <ul>
                {data.length <= 0
                    ? 'NO REVIEWS YET'
                    : newData.map((reviewObj, index) => {
                        return (
                            this.renderContent(reviewObj, index)
                        );
                    })
                }
            </ul>
        );
    }
}

ReviewList.propTypes = {
    data: PropTypes.array
};

ReviewList.defaultProps = {
    data: []
};

export default ReviewList;



