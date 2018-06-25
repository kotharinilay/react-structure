/************************************** 
 * HTTP services (GET, POST) for server calls
 ***************************************/

import Promise from 'bluebird';
import axiosInstance from 'axios';
import HttpClient from './http-client';

const basePath = "http://localhost:56839/api"

const httpClient = new HttpClient();
httpClient.setDefaultInstance(axiosInstance);
httpClient.register(axiosInstance);

// http get request
function get(url, data = null, headers = null, includeBase = true) {
    let finalUrl = includeBase ? (basePath + url) : url;

    return httpClient.request({
        method: 'get', url: finalUrl, headers: headers, params: data
    }).then(function (res) {
        return Promise.resolve(res);
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

// http post request
function post(url, data = null, headers = null, includeBase = true) {
    let finalUrl = includeBase ? (basePath + url) : url;

    return httpClient.request({
        method: 'post', url: finalUrl, headers: headers, data: data
    }).then(function (res) {
        return Promise.resolve(res);
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

function put(url, data = null, headers = null, includeBase = true, progressData) {
    let finalUrl = includeBase ? (basePath + url) : url;
    var config = {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            if (progressData) progressData(percentCompleted);
        }
    };

    return httpClient.request({
        method: 'put', url: finalUrl, headers: headers, data: data, onUploadProgress: config.onUploadProgress
    }).then(function (res) {
        return Promise.resolve(res);
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

module.exports = {
    get: get,
    post: post,
    put: put
}