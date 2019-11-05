import React, { Component } from 'react';
import { AttachMoney, AccessAlarm, Fastfood } from '@material-ui/icons';
import PropTypes from 'prop-types';
import ReviewListItem from '../ReviewListItem/ReviewListItem';
// styles
import './ReviewList.css';

const FILTER_PRICE = 'price';
const FILTER_QUALITY = 'quality';
const FILTER_SPEED = 'speed';


class ReviewList extends Component {

    state = {
        filter: FILTER_PRICE
    }

    changeFilter = (filter) => {
        console.log('*************************');
        console.log('  changeFilter:',filter);
        this.setState({filter: filter});
    }

    getFilterActiveClass = (name) => {
        console.log('getFilterActiveClass:',name);
        console.log('this.state.filter:',this.state.filter);
        let activeClass = this.state.filter === name ? ' active' : '';
        console.log('activeClass:',activeClass);
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

    renderFilters = () => {
        return (<div id={'result-filters-container'}>
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
        const {data} = this.props;
        const newData = data.sort((a, b) => (a.rank[this.state.filter] < b.rank[this.state.filter]) ? 1 : ((b.rank[this.state.filter] < a.rank[this.state.filter]) ? -1 : 0));

        return (
            <>
                { this.renderFilters() }
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
    data: PropTypes.array
};

ReviewList.defaultProps = {
    data: []
};

export default ReviewList;



