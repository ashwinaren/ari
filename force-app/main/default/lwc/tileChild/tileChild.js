import { LightningElement,wire } from 'lwc';
import TILE_SELECTION_MC from '@salesforce/messageChannel/Status__c';
import {
    subscribe,
    unsubscribe,
    MessageContext,
    publish
} from 'lightning/messageService';

export default class TileChild extends LightningElement {
    latitude='12.977777';
    longitude='77.572573';
    @wire(MessageContext)
    messageContext;
    connectedCallback() {
            this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            TILE_SELECTION_MC,
            (message) => this.handleCustomerSelect(message)
        );
    }
    handleCustomerSelect(message) {
        this.latitude=message.latitude;
        this.longitude=message.longitude;
        alert('child lat-->'+this.latitude+' -- '+JSON.stringify(this.latitude));
        alert('child lang -->'+this.longitude+'  --- '+JSON.stringify(this.longitude));
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    /**  Map parameters  */
    selectedMarkerValue = 'SF1';
    mapMarkers = [
        {
            location: {
                Street: 'Bus Sta Upas',
                City: 'Bengaluru',
                State: 'Karnataka',
            },
            title: 'Majestic Bus Stand',
            description:
                'Majestic.',
        },
        {
            location: {
                Street: 'Subhash Nagar, Sevashrama',
                City: 'Bengaluru',
                State: 'Karnataka',
            },
            title: 'Railway Station',
            description: 'Railway Station.',
        },
        {
            location: {
                Street: 'Mysore Rd, Jnana Bharathi',
                City: 'Bengaluru',
                State: 'Karnataka',
            },
            title: 'Bangalore University',
            description:
                'Bangalore University.',
        },
    ];
 
    markersTitle = 'Charging Stations';
    center = {
        location: { Latitude: this.latitude, Longitude: this.longitude },
    };
}