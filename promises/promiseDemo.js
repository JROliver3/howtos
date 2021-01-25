export default class PromiseDemo {
    PENDING = 0;
    FULFILLED = 1;
    REJECTED = 2;
    value = null;
    //we default our fulfilled and rejection functions to the identity function
    onFulfilled = function (value) { return value; }
    onRejected = function (reason) { return reason; }

    constructor(action){
        //the status has values pending, rejected, and fulfilled. Once a promise is fulfilled or rejected, it is immutable.
        this.status = this.PENDING;
        this.performAsynchronousTask(action);
    }
    setStatus(status){
        //we only change the status if the status is set to pending, otherwise it is immutable.
        if(this.status === this.PENDING){ 
            this.status = status;
        } else {
            throw new Error(`Promise is done and cannot be changed.`)
        }
    }
    resolve(value){
        //when the user calls our promise's resolve function, we want to change the status to fulfilled, update our value with the resolved value,
        //then move on to the function provided in the promise's then function.
        this.setStatus(this.FULFILLED);
        this.value = value;
        return this.then();
    }
    reject(reason){
        //rejection is similar to resolve except we're given a reason instead of a value.
        //in a real promise we are given warnings in the console when not providing a rejection method
        this.setStatus(this.REJECTED);
        this.reason = reason;
        return this.then();
    }
    async performAsynchronousTask(action){
        if(action){
            //Here we assume that the function passed into the Promise has resolve and reject parameters.
            try {
                //we call the action method passed into the actual promise with our resolve and reject methods
                action((value) => { this.resolve(value) }, (reason) => { this.reject(reason) })
            } catch(err) {
                //if the action errors out in some way during operation we call reject ourselves with the error as the reason.
                this.reject(err);
            }
        }
    }
    then(onFulfilled, onRejected) {
        //We set the callbacks for the promise so that we can later call this then again when the status is changed from pending to
        //fulfilled or rejected.
        if(onFulfilled){ this.onFulfilled = onFulfilled; }
        if(onRejected){  this.onRejected = onRejected; }
        if(this.status === this.FULFILLED) { 
            //we return a resolved promise if the status is fulfilled.
            return this.onFulfilled(this.value);
        }
        else if(this.status === this.REJECTED) { 
            //we return a rejected promise if the status is rejected.
            return this.onRejected(this.reason); 
        }
    }
}
