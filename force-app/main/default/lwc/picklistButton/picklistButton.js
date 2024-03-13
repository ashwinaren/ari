import { LightningElement,wire } from 'lwc';
import cityValues from '@salesforce/apex/chargingStationvalues.cityCoordinates';
/*import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import STATUS from '@salesforce/messageChannel/Status__c';*/
import { MessageContext } from 'lightning/messageService';
import {publishMC, subscribeMC, unsubscribeMC} from 'c/lmsShared'; 
export default class PicklistButton extends LightningElement {
    cityname;
    mapMarkers;
    subscription = null;
    receivedMessage = '';
    @wire(MessageContext) messageContext;
    connectedCallback() {
        console.log(' Inside connected ');
        //this.subscribeToMessageChannel();
        /*if (this.subscription){
            //Unsubscribe from Channels button clicked 
            unsubscribeMC(this.subscription);
            this.subscription = null;
            this.subBtnLabel = 'Subscribe to Channels';
            this.subBtnVariant = 'brand';
        }
        else {*/
            //Subscribe to Channels button clicked
            subscribeMC(this.messageContext, (subscription, message) => {
                this.subscription = subscription;
                this.receivedMessage = (message && this.optValues.includes(message.mapMarks)) 
                                        ? message.cityName.message : this.receivedMessage;
            });
            console.log(' Button received message -- '+JSON.stringify(this.receivedMessage));
        //}
    }

    disconnectedCallback() {
        //this.unsubscribeToMessageChannel();
    }
    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                STATUS,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
        this.cityname = message.cityname;
        console.log(' city -- '+this.cityname);
    }
    publishSelect(event) {
        cityValues({ selectedCity: this.cityname })
            .then((data) => {
                data.forEach(dataItem => {
                    this.showmap=true;
                    this.mapMarkers = [...this.mapMarkers ,
                        {
                            location: {
                                Street: dataItem.Address__c, 
                                City: dataItem.City__c,
                                Country: dataItem.Country__c,
                            },
                            icon: 'custom:custom26',
                            title: dataItem.Name,
                        }                                    
                    ];
                  });
            })
            .catch((error) => {
                this.error = error;
                this.coordinates = undefined;
            });
            publishMC(this.messageContext, this.cityname, this.mapMarkers);
    }
}