import { LightningElement } from 'lwc';
export default class MapLocationLWC extends LightningElement {
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
        location: { Latitude: '12.977777', Longitude: '77.572573' },
    };
    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.target.selectedMarkerValue;
        console.log(' selected CS -- '+JSON.stringify(this.selectedMarkerValue));
    }
}