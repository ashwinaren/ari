import { LightningElement,wire,track } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import CHARGING_OBJECT from '@salesforce/schema/Charging_Station__c';
import CITY_FIELD from '@salesforce/schema/Charging_Station__c.City__c';
import STATE_FIELD from '@salesforce/schema/Charging_Station__c.State__c';
import { MessageContext } from 'lightning/messageService';
import {publishMC, subscribeMC, unsubscribeMC} from 'c/lmsShared'; 
export default class PicklistLWC extends LightningElement {
    cities;
    states;
    showmap=false;
    isRendered = false;
    @track error;
    @track mapMarkers = [];
    mapvalues;
    selectedMarkerValue;
    markersTitle = 'Charging Stations';
    subscription = null;
    receivedMessage = '';
    /*latitude;
    longitude;*/
    @wire(MessageContext) messageContext;
    @wire(getObjectInfo, {objectApiName: CHARGING_OBJECT })
    stationInfo;
    @wire(getPicklistValues, {recordTypeId: '$stationInfo.data.defaultRecordTypeId', fieldApiName: CITY_FIELD })
    cityFieldInfo({ data, error }) {
        if (data) this.cityFieldData = data;
    }
    @wire(getPicklistValues, {recordTypeId:'$stationInfo.data.defaultRecordTypeId', fieldApiName: STATE_FIELD })
    stateFieldInfo({ data, error }) {
        if (data) this.states = data.values;
    }

    getCurrentBrowserLocation() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=> {
                let currentLocation = {
                    location : {
                        Latitude: position.coords.latitude,
                        Longitude: position.coords.longitude
                    },
                    title : 'My location'
                };
                this.mapMarkers = [currentLocation];
                this.showmap=true;
                console.log(' map markers -- '+JSON.stringify(this.mapMarkers));
            }, (error) => {}, options);
        }
    }
    connectedCallback(){
        console.log('>>> in connected callback');
        if(!this.isRendered){
            console.log('entered get location');
            this.getCurrentBrowserLocation();
        }
        this.isRendered = true;
        subscribeMC(this.messageContext, (subscription, message) => {
            this.subscription = subscription;
            this.receivedMessage = (message && this.optValues.includes(message.mapMarks)) 
                                    ? message.cityName.message : this.receivedMessage;
        });
        console.log(' LWC received message -- '+JSON.stringify(this.receivedMessage));
        //this.subscribeToMessageChannel();
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
        this.mapMarkers = message.mapMarkers;
        console.log(' new markers -- '+this.mapMarkers);
    }
    handleStateChange(event) {
        let key = this.cityFieldData.controllerValues[event.target.value];
        this.cities = this.cityFieldData.values.filter(opt => opt.validFor.includes(key));
        console.log(' selected State  -- '+JSON.stringify(event.target.value));
    }
    handleCityChange(event){
        this.selectedcity = event.detail.value;
        console.log(' selected city  -- '+this.selectedcity);
        const payload = { cityname : this.selectedcity };
        //publish(this.messageContext, STATUS, payload);
        publishMC(this.messageContext, this.selectedcity, this.mapMarkers);
    }
}