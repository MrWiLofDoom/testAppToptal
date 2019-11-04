// import { default as axios } from '../api/axios-api';
import axios from 'axios';
import api from '../config/config.js';

const apiHelper = {
    fetchDataApi: () => {
        return axios({
            method: 'get',
            url: api.api_path + api.data_path,
            crossdomain: true
        });
    },
    addDataApi: (data) => {
        const url = api.api_path + api.data_path + '/' + data.id;
        return axios.put(url, {review: data.review});
    },
    updateDataApi: data => {
        console.log('updateDataApi data:',data);
        const url = api.api_path + api.data_path +'/' + data._id;
        return axios.post(url, {review: data, id: data.id});
    },
    deleteDataApi: data => {
        const { payload } = data;
        const url = api.api_path + api.data_path  + '/' + payload;
        return axios.delete(url, payload);
    }
};

export default apiHelper;