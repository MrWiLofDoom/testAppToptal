import React, { Component } from 'react';
import { AttachMoney, AccessAlarm, Fastfood } from '@material-ui/icons';
import PropTypes from 'prop-types';
import ReviewListItem from '../ReviewListItem/ReviewListItem';
// styles
import './ReviewList.css';

import {
    MY_REVIEWS,
    FILTER_PRICE,
    FILTER_SPEED,
    FILTER_QUALITY
} from '../../constants/constants';


class ReviewList extends Component {

    constructor() {
        super();
        this.state = {
            filter: FILTER_PRICE
        }
    }

    changeFilter = (filter) => {
        this.setState({filter: filter});
    }

    getFilterActiveClass = (name) => {
        let activeClass = this.state.filter === name ? ' active' : '';
        return 'filter-icon' + activeClass;
    }

    renderContent = (reviewObj, index) => {
        const { price, quality, speed, rating } = reviewObj.rank;
        return (
            <ReviewListItem
                key={'review-list-item-'+index}
                index={index}
                reviewObj={reviewObj}
                price={price}
                quality={quality}
                speed={speed}
                rating={rating}
                openModal={this.props.openModal}
                total={reviewObj.total}
            ></ReviewListItem>
        );
    };

    renderSummary = () => {
        return (<div id={'result-filters-container'}>
            <div className={'all-restaurants'}>All Restaurants</div>
        </div>);
    }

    renderFilters = () => {
        return (<div id={'result-filters-container'}>
            <div id={'sort-by'}>Sort by</div>
            <div className={this.getFilterActiveClass(FILTER_PRICE)}>
                <AttachMoney name={FILTER_PRICE} onClick={(e)=>this.changeFilter(FILTER_PRICE)}/>
            </div>
            <div className={this.getFilterActiveClass(FILTER_QUALITY)}>
                <Fastfood name={FILTER_QUALITY} onClick={(e)=>this.changeFilter(FILTER_QUALITY)}/>
            </div>
            <div className={this.getFilterActiveClass(FILTER_SPEED)}>
                <AccessAlarm name={FILTER_SPEED} onClick={(e)=>this.changeFilter(FILTER_SPEED)}/>
            </div>
        </div>)
    }

    render () {
        const {data, type} = this.props;
        const { filter } = this.state;
        const newData = data.sort((a, b) => (a.rank[filter] < b.rank[filter]) ? 1 : ((b.rank[filter] < a.rank[filter]) ? -1 : 0));
        const showFilters = type === MY_REVIEWS;
        return (
            <>
                { showFilters && this.renderFilters() }
                { !showFilters && this.renderSummary() }
                <ul className={'review-list-ul'}>
                    {data.length <= 0
                        ? <li className={'no-reviews-yet'}>NO REVIEWS YET</li>
                        : newData.map((reviewObj, index) => {
                            return (
                                this.renderContent(reviewObj, index)
                            );
                        })
                    }
                </ul>
            </>
        );
    }
}

ReviewList.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string,
    openModal: PropTypes.func.isRequired
};

ReviewList.defaultProps = {
    data: [],
    type: ''
};

export default ReviewList;



