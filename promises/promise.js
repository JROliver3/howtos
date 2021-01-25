import apiService from './service.js';
import Promise from 'promise';
import PromiseDemo from './promiseDemo.js';


testWithRealPromise();
//testWithPromiseDemo();

function testWithRealPromise(){
    //we create a new promise with two in-built functions, resolve, and reject. 
    let promise = new Promise((resolve, reject) => {
        //we create our own mock service and call the success and failure routes to test our promise
        apiService.performServiceFailure((result)=>{
            //we check the status of the service response, if 200 then we resolve and we reject otherwise
            if(result.status == 200){
                //any value that we pass to resolve will then be passed to our then method
                resolve(result.message);
            } else {
                //similarly, any value we pass to rejected will be passed to any reject method we provide to then
                reject("rejected");
            }
        });
    }).then((value)=>{
        console.log("success: " + value);
    }, (reason)=>{
        console.log("failure: " + reason);
    })
}

function testWithPromiseDemo(){
    //we do the same as above and our promise demo should work identically to the real promise for our use cases
    let promise = new PromiseDemo((resolve, reject) => {
        apiService.performServiceFailure((result)=>{
            if(result.status == 200){
                resolve(result.message);
            } else {
                reject("rejected");
            }
        });
    }).then((value)=>{
        console.log("success: " + value);
    }, (reason)=>{
        console.log("failure: " + reason);
    })
}

