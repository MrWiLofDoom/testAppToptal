import {
    UPDATE_DATA,
    DELETE_DATA,
    FETCH_DATA,
    ADD_DATA, DELETE_RESTAURANT
} from '../actions/types';

export const fetchData = (userId) => ({
    type: FETCH_DATA,
    userId: userId
});

export const updateData = (update, updateTitle, id, rank, userId) => ({
    type: UPDATE_DATA,
    _id: id,
    userId: userId,
    update: update,
    rank: rank,
    updateTitle: updateTitle
});

export const deleteData = (id, userId) => ({
    type: DELETE_DATA,
    id: id,
    userId: userId
});

export const deleteRestaurant = (name) => ({
    type: DELETE_RESTAURANT,
    name: name
});


export const addData = (name, review, rank, id, userId) => ({
    type: ADD_DATA,
    id: id,
    review: review,
    name: name,
    rank: rank,
    userId: userId
});
