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
            ></ReviewListItem>
        );
    };

    renderSummary = () => {
        return (<div id={'result-filters-container'}>
            summary
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
        const newData = data.sort((a, b) => (a.rank[this.state.filter] < b.rank[this.state.filter]) ? 1 : ((b.rank[this.state.filter] < a.rank[this.state.filter]) ? -1 : 0));
        const showFilters = type === MY_REVIEWS;
        return (
            <>
                { showFilters && this.renderFilters() }
                { !showFilters && this.renderSummary() }
                <ul className={'review-list-ul'}>
                    {data.length <= 0
                        ? 'NO REVIEWS YET'
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
    type: PropTypes.string
};

ReviewList.defaultProps = {
    data: [],
    type: ''
};

export default ReviewList;



