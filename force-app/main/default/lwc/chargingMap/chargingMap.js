import { LightningElement,wire,track } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
/*import { getRecord } from 'lightning/uiRecordApi';*/
import CHARGING_OBJECT from '@salesforce/schema/Charging_Station__c';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import CITY_FIELD from '@salesforce/schema/Charging_Station__c.City__c';
import STATE_FIELD from '@salesforce/schema/Charging_Station__c.State__c';
import cityValues from '@salesforce/apex/chargingStationvalues.cityCoordinates';
/*import userValues from '@salesforce/apex/chargingStationvalues.userDetails';
import USER_ID from '@salesforce/user/Id';
import USER_NAME from '@salesforce/schema/User.Name';
import USER_CITY from '@salesforce/schema/User.City';
import USER_COUNTRY from '@salesforce/schema/User.Country';*/
export default class ChargingMap extends LightningElement {
    @track error;
    @track mapMarkers = [];
    @track isShowModal = false;
    mapvalues;
    //selectedMarkerValue;
    markersTitle = 'Charging Stations';
    zoomLevel = 11;
    selectedcity;
    cities;
    states;
    latitude;
    longitude;
    location;
    isRendered = false;
    clickFooter=false;
    showmap=false;
    @track name;
    @track ucity;
    @track ucountry;
    getCurrentBrowserLocation() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        if(navigator.geolocation) {
            //accessing getCurrentPosition method
            navigator.geolocation.getCurrentPosition((position)=> {
                //success callback
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
            }, (error) => {
                //error callback
            }, options);
        }
    }
    connectedCallback(){
        console.log('>>> in connected callback');
        if(!this.isRendered){
            this.getCurrentBrowserLocation();
        }
        this.isRendered = true;
   } 
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
    handleStateChange(event) {
        let key = this.cityFieldData.controllerValues[event.target.value];
        this.cities = this.cityFieldData.values.filter(opt => opt.validFor.includes(key));
        console.log(' selected State  -- '+JSON.stringify(event.target.value));
    }
    handleChange(event){
        this.selectedcity = event.detail.value;
        console.log(' selected city  -- '+this.selectedcity);
    }
    publishSelect(event) {
        cityValues({ selectedCity: this.selectedcity })
            .then((data) => {
                data.forEach(dataItem => {
                    console.log(' User  -- '+this.name+'   City -- '+dataItem.City__c+' user city -- '+this.ucity+' user Country -- '+this.ucountry);
                    this.showmap=true;
                    //this.mapMarkers.clear();
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
    }
    handleModal(event){
        this.isShowModal = true;
    }
    handleClose(event){
        this.isShowModal = false;
    }
    selectedMarkerValue = 'SF1';
    handleMarkerSelect(event){
        this.selectedMarkerValue = event.target.selectedMarkerValue;
        console.log(' Selected Marker 1 -- '+JSON.stringify(event.target.selectedMarkerValue)+' -- '+JSON.stringify(event.target.value)+' '+JSON.stringify(event.detail.selectedMarkerValue)+' '+JSON.stringify(event.detail.value));
        console.log(' Selected Marker 1 -- '+event.target.selectedMarkerValue+' -- '+event.target.value+' '+event.detail.selectedMarkerValue+' '+event.detail.value);
    }
    selectedMarkerValue(event){
        this.selectedMarkerValue = event.target.selectedMarkerValue;
        console.log(' Selected Marker 1 -- '+JSON.stringify(event.target.selectedMarkerValue)+' -- '+JSON.stringify(event.target.value)+' '+JSON.stringify(event.detail.selectedMarkerValue)+' '+JSON.stringify(event.detail.value));
    }
    showFooter(event){
        console.log(' Selected Foot -- '+JSON.stringify(event.target.value));
        const selFooter = this.querySelector('lightning-map');
        alert(' footer '+selFooter);
    }

}