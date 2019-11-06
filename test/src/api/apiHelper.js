import axios from 'axios';
import api from '../config/config.js';

const apiHelper = {
    fetchDataApi: (data) => {
        let url = api.api_path + api.data_path;
        if(data && data.userId){
            url += '/user/' + data.userId;
        }
        return axios({
            method: 'get',
            url: url,
            crossdomain: true
        });
    },
    addDataApi: (data) => {
        const url = api.api_path + api.data_path + '/user/' + data.userId + '/' + data.id;
        return axios.put(url, {name: data.name, review: data.review, rank: data.rank});
    },
    updateDataApi: data => {
        console.log('updateDataApi data:',data);
        const url = api.api_path + api.data_path  + '/user/' + data.userId + '/' + data._id;
        return axios.post(url, {review: data, id: data.id, restaurant_name: data.updateTitle});
    },
    deleteDataApi: data => {
        const { payload } = data;
        const url = api.api_path + api.data_path + '/user/' + data.userId +  '/' + payload;
        return axios.delete(url, payload);
    },
    loginUser: (data) => {
        console.log('loginUser data:',data);
        const url = api.api_path + api.login_path;
        return axios.post(url, {email: data.email, password: data.password});
    },
    registerUser: (data) => {
        console.log('registerUser data:',data);
        const url = api.api_path + api.register_path;
        return axios.post(url, {name: data.name, email: data.email, password: data.password, password2: data.password2});
    },
    roundRating: (rating) => {
        return (Math.round(rating * 2) / 2).toFixed(1);
    }
};

export default apiHelper;