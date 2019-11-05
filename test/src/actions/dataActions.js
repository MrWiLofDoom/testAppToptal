import  {
    UPDATE_DATA,
    DELETE_DATA,
    FETCH_DATA,
    ADD_DATA
} from '../actions/types';

export const fetchData = (userId) => ({
    type: FETCH_DATA,
    userId: userId
});

export const updateData = (update, updateTitle, id, updateId) => ({
    type: UPDATE_DATA,
    _id: id,
    id: updateId,
    update: update,
    updateTitle: updateTitle
});

export const deleteData = (payload) => ({
    type: DELETE_DATA,
    payload
});

export const addData = (name, review, rank, id, userId) => ({
    type: ADD_DATA,
    id: id,
    review: review,
    name: name,
    rank: rank,
    userId: userId
});
