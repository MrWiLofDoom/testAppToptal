import React, { Component } from 'react';
import { AttachMoney, AccessAlarm, Fastfood } from '@material-ui/icons';
import PropTypes from 'prop-types';
import './ReviewList.css';

const FILTER_PRICE = 'price';
const FILTER_QUALITY = 'quality';
const FILTER_SPEED = 'speed';

class ReviewList extends Component {

    state = {
        filter: FILTER_PRICE
    }

    getReviewColor = (rank) => {
        console.log('getReviewColor:',rank);
        let color;
        if (rank > -1 && rank <= 2) {
            color = 'bad';
        } else if (rank > 2 && rank < 4) {
            color = 'ok';
        } else {
            color = 'good';
        }
        console.log('color:',color);
        return color;
    }

    changeFilter = (e) => {
        console.log('changeFilter:',e.target.name);
        this.setState({filter:e.target.name});
    }

    getFilterActiveClass = (name) => {
        console.log('getFilterActiveClass:',name);
        console.log('this.state.filter:',this.state.filter);
        let activeClass = this.state.filter === name ? ' active' : '';
        console.log('activeClass:',activeClass);
        return 'filter-icon' + activeClass;
    }

    renderContent = (reviewObj, index) => {
        const { price, quality, speed } = reviewObj.rank;
        return (
            <li className={'review-item'} key={index}>
                <div className={'review-item-meta'}>
                    <div className={'review-item-meta-restaurant-name'}>{reviewObj.restaurant_name}</div>
                    <div className={'review-item-meta-review'}>{reviewObj.review}</div>
                </div>
                <div className={'review-container'}>
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
            </li>
        );
    };

    renderFilters = () => {
        return (<div id={'result-filters-container'}>
            <div className={this.getFilterActiveClass(FILTER_PRICE)}>
                <AttachMoney name={FILTER_PRICE} onClick={(e)=>this.changeFilter(e)}/>
            </div>
            <div className={this.getFilterActiveClass(FILTER_QUALITY)}>
                <Fastfood name={FILTER_QUALITY} onClick={(e)=>this.changeFilter(e)}/>
            </div>
            <div className={this.getFilterActiveClass(FILTER_SPEED)}>
                <AccessAlarm name={FILTER_SPEED} onClick={(e)=>this.changeFilter(e)}/>
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



