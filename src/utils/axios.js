const axios = require('axios');

module.exports.curlGet = async (endpoint, config) => {
    try {
        return await axios.get(`${endpoint}`, config)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
                let res = {
                    'status': response.status,
                    'response': response.data
                };
                return res;
            })
            .catch(function (error) {
                console.log(error.response.data)
                let res = {
                    'status': error.response.status,
                    'response': error.response.data
                };
                return res;
            });
    } catch (error) {
        console.error(error);
    }
}

module.exports.curlPost = async (endpoint, data, config) => {
    try {
        return await axios.post(`${endpoint}`, data, config)
            .then(function (response) {
                let res = {
                    'status': response.status,
                    'response': response.data
                };
                return res;
            })
            .catch(function (error) {
                let res = {
                    'status': error.response.status,
                    'response': error.response.data
                };
                return res;
            });
    } catch (error) {
        console.error(error);
    }
}
