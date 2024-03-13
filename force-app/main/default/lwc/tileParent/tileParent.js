import { LightningElement,wire } from 'lwc';
import TILE_SELECTION_MC from '@salesforce/messageChannel/Status__c';
import {
    subscribe,
    APPLICATION_SCOPE,
    MessageContext,
    publish
} from 'lightning/messageService';
export default class TileParent extends LightningElement {
    @wire(MessageContext)
    messageContext;

    publishSelect(event) {
        var clearall=true;
        const payload = { clearall:true};
        alert('clearall-->'+clearall);
        alert('payload-->'+payload);
        publish(this.messageContext, TILE_SELECTION_MC, payload);
    }
}