/// <reference path='../../../typings/slatwallTypescript.d.ts' />
/// <reference path='../../../typings/tsd.d.ts' />

import * as Prototypes from '../../../../../org/hibachi/client/src/core/prototypes/Observable';

/**
 * Fulfillment List Controller
 */
class SWOrderFulfillmentService implements  Prototypes.Observable.IObservable {

    public observers: Array<Prototypes.Observable.IObserver>

    // @ngInject
    constructor(private $hibachi, private $timeout, private collectionConfigService, private $http){
        this.observers = new Array<Prototypes.Observable.IObserver>();
    }

    /**
     * This manages all the observer events without the need for setting ids etc.
     */
    public registerObserver = (_observer: Prototypes.Observable.IObserver) => {
        if (!_observer){
            throw new Error('Observer required for registration');
        }
        this.observers.push(_observer);
    }
    /**
     * Removes the observer. Just pass in this
     */
    public removeObserver = (_observer: Prototypes.Observable.IObserver) => {
         if (!_observer){
            throw new Error('Observer required for removal.');
         }
         for (var observer in this.observers){
            if (this.observers[observer] == (_observer)){
                if (this.observers.indexOf(_observer) > -1){
                    this.observers.splice(this.observers.indexOf(_observer), 1);
                }
            }
         }
    }
    
    /**
     * Note that message should have a type and a data field
     */
    public notifyObservers = (_message: any) => {
        for (var observer in this.observers){
            this.observers[observer].recieveNotification(_message);
        }
    }

    /**
     * Creates a batch. This should use api:main.post with a context of process and an entityName instead of doAction.
     */
    public addBatch = (processObject) => {
    if (processObject) {
            console.log("Hibachi", this.$hibachi);
            console.log("Process Object", processObject);
            //this.orderFulfillmentService.addBatch(this.getBatchProcess());
            processObject.data.entityName = "FulfillmentBatch";
            
            processObject.data['fulfillmentBatch'] = {};
            processObject.data['fulfillmentBatch']['fulfillmentBatchID'] = "";

            //This goes to service.
            return this.$hibachi.saveEntity("fulfillmentBatch",'',processObject.data, "create");
           // return this.$http.post("/?slataction=api:main.doProcess", processObject.data, {});
        }
    }
}
export {
    SWOrderFulfillmentService
}