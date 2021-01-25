let apiService = {
    performServiceOperation: (callback) => {
        return setTimeout(() => {
            let result = { message: "Response successful", status: 200 }
            callback(result);
        }, 3000);
    },
    performServiceFailure: (callback) => {
        return setTimeout(() => {
            let result = { message: "Response failure.", status: 500 }
            callback(result);
        }, 3000);
    }
}

export default apiService;

//module.exports = [apiService];