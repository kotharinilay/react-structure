/************************************** 
 * track http requests/responses
 ***************************************/

import axios from 'axios';
import Promise from 'bluebird';

export default class HttpClient {

    constructor() {
        this.loadingProgress = 0;
        this.disconnected = false;
        this.deferredAxiosCalls = [];
        this.axiosInstances = [];
        this.defaultInstance = null;
    }

    // set header for request such as auth token
    setRequestHeader = (config) => {

        config.headers['Accept-Language'] = 'en';

        // IE Browser settings for request header
        config.headers['cacheSeconds'] = '0';
        config.headers['useExpiresHeader'] = 'true';
        config.headers['useCacheControlHeader'] = 'true';
        config.headers['useCacheControlNoStore'] = 'true';
        // Set to expire far in the past.
        config.headers['Expires'] = 'Mon, 23 Aug 1982 12:00:00 GMT';
        // Set standard HTTP/1.1 no-cache headers.
        config.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate';
        // Set standard HTTP/1.0 no-cache header.
        config.headers['Pragma'] = 'no-cache';

        return config;
    }

    // increase counter on each API request
    increament = (param) => {
        if (this.loadingProgress === 0) // $(".app-init-loader").show(); ;
            this.loadingProgress += 1;
        return this.setRequestHeader(param);
    }

    // decrease counter upon receiving response
    decreament = (param) => {
        if (this.disconnected === true)
            this.disconnected = false;
        // var response = param.status ? param : param.response;
        this.loadingProgress -= 1;
        if (this.loadingProgress === 0) {
            // hide app loader here
        }
        return param;
    }

    // error received from API response
    error = (param) => {
        this.loadingProgress -= 1
        if (this.loadingProgress === 0) {
            // hide app loader here
        }

        if (param.message === 'Network Error') {
            if (this.disconnected === false)
                this.disconnected = true;
            // Add current axios call to deferred because network is offline
            this.deferredAxiosCalls.push(param.config);
            // // this.openModal('Network Error', 'Unable to connect to Aglive server.')
            param.response = {
                data: {
                    success: false, unauthorized: true, error: 'Network Error'
                }
            }
        } else {
            // Those are 4xx and 5xx errors, not disconnects, and should not be retried
            if (this.disconnected === true)
                this.disconnected = false;
            //var response = param.response;


            if (param.response.status === 400) {
                param.response.data.badRequest = true;
            }
        }
        return Promise.reject(param);
    }

    setDefaultInstance = (axiosInstance) => {
        this.defaultInstance = axiosInstance;
    }

    register = (axiosInstance) => {
        this.axiosInstances.push(axiosInstance);
        axiosInstance.interceptors.request.use(this.increament, this.error);
        axiosInstance.interceptors.response.use(this.decreament, this.error);
    }

    request = (config) => {
        return (config.instance || this.defaultInstance || axios).request(config);
    }

    retry = () => {
        while (this.deferredAxiosCalls.length) {
            const cfg = this.deferredAxiosCalls.shift();
            this.request(cfg);
        }
    }
}