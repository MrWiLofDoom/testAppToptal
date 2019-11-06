import {
    FETCH_DATA_FAILED,
    FETCH_DATA_RECEIVED,
    FETCH_DATA,
    UPDATE_DATA_RECEIVED,
    UPDATE_DATA_FAILED,
    UPDATE_DATA,
    DELETE_DATA_FAILED,
    DELETE_DATA_RECEIVED,
    DELETE_DATA,
    ADD_DATA_FAILED,
    ADD_DATA_RECEIVED,
    ADD_DATA
} from '../actions/types';

import _ from 'lodash';

import apiHelper from '../api/apiHelper';

const initialState = {
    authenticated: true,
    isEditor: true,
    data: [],
    hasError: false
};

export default function dataReducer (state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_DATA_FAILED:
            newState = Object.assign({}, state, {hasError: true});
            return newState;
        case FETCH_DATA_RECEIVED:
            let newData = [];
            if (_.isEmpty(action.userId)) {
                let reviews = action.response.data.reviews;
                let lastName = '';
                reviews.map((value) => {
                    if (_.isEmpty(lastName)) lastName = value.restaurant_name;
                    if (!_.isEqual(lastName, value.restaurant_name)) lastName = value.restaurant_name;
                    let hasIt = newData.some(e => e.restaurant_name === lastName);
                    if (!hasIt) {
                        newData.push(
                            {
                                restaurant_name: value.restaurant_name,
                                rank: value.rank,
                                total: 1
                            }
                        );
                    } else {
                        let thisIndex = newData.findIndex(x => x.restaurant_name === value.restaurant_name);
                        let thisItem = newData[thisIndex];
                        thisItem.rank = {
                            price: thisItem.rank.price + value.rank.price,
                            speed: thisItem.rank.speed + value.rank.speed,
                            quality: thisItem.rank.quality + value.rank.quality,
                            rating: thisItem.rank.rating + value.rank.rating
                        };
                        thisItem.total = thisItem.total + 1;
                    }
                    return value;
                });
                newData.map((value) => {
                    value.rank.price = apiHelper.roundRating(value.rank.price / value.total);
                    value.rank.quality = apiHelper.roundRating(value.rank.quality / value.total);
                    value.rank.speed = apiHelper.roundRating(value.rank.speed / value.total);
                    value.rank.rating = apiHelper.roundRating(value.rank.rating / value.total);
                    // get best
                    let bestRating = Math.max.apply(Math, reviews.map(function(o) { return Number(o.rank.rating); }));
                    let bestReviewObj = reviews[reviews.findIndex(x => Number(x.rank.rating) === bestRating)];
                    value.bestReview = bestReviewObj;
                    // get worst
                    let worstRating = Math.min.apply(Math, reviews.map(function(o) { return Number(o.rank.rating); }));
                    let worstReviewObj = reviews[reviews.findIndex(x => Number(x.rank.rating) === worstRating)];
                    value.worstReview = worstReviewObj;
                    return value;
                });


            } else {
                newData = action.response.data.reviews;
            }
            newState = Object.assign({}, state, {hasError: false, data: newData});
            return newState;
        case FETCH_DATA:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        case UPDATE_DATA_FAILED:
            newState = Object.assign({}, state, {hasError: true});
            return newState;
        case UPDATE_DATA_RECEIVED:
            newState = Object.assign({}, state, {hasError: false, data: action.response.data.reviews});
            return newState;
        case UPDATE_DATA:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        case DELETE_DATA_FAILED:
            newState = Object.assign({}, state, {hasError: true});
            return newState;
        case DELETE_DATA_RECEIVED:
            newState = Object.assign({}, state, {hasError: false, data: action.response.data.reviews});
            return newState;
        case DELETE_DATA:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        case ADD_DATA_FAILED:
            newState = Object.assign({}, state, {hasError: true});
            return newState;
        case ADD_DATA_RECEIVED:
            newState = Object.assign({}, state, {hasError: false, data: action.response.data.reviews});
            return newState;
        case ADD_DATA:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        default:
            return state;
    }
}