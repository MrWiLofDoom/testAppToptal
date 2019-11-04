import  {
    UPDATE_DATA,
    DELETE_DATA,
    FETCH_DATA,
    ADD_DATA
} from '../actions/types';

export const fetchData = (payload) => ({
    type: FETCH_DATA
});

export const updateData = (update, id, updateId) => ({
    type: UPDATE_DATA,
    _id: id,
    id: updateId,
    update: update
});

export const deleteData = (payload) => ({
    type: DELETE_DATA,
    payload
});

export const addData = (review, id) => ({
    type: ADD_DATA,
    id: id,
    review: review
});
