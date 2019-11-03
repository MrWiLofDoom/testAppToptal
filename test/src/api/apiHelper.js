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
        console.log('addDataApi!!!');
        console.log('data:',data);
        const url = api.api_path + api.data_path;
        return axios.put(url, {review: data.review, id: data.id});
    },
    updateDataApi: data => {
        const { payload } = data;
        const url = api.api_path + api.data_path;
        return axios.post(url, payload);
    },
    deleteDataApi: data => {
        const { payload } = data;
        console.log('data:',data);
        console.log('payload:',payload);
        const url = api.api_path + api.data_path  + '/' + payload;
        return axios.delete(url, payload);
    },
    formatResponse: data => {
        return data.response;
    }
};

export default apiHelper;