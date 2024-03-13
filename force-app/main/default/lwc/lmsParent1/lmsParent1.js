import { LightningElement,wire } from 'lwc';
import {publish,subscribe,unsubscribe,APPLICATION_SCOPE,MessageContext} from 'lightning/messageService';
import LWCMC from '@salesforce/messageChannel/LWCMessageChannel__c';
export default class LmsParent1 extends LightningElement {
    receivedMessage;
    @wire( MessageContext ) messageContext;
    msgToPublish;
    setMsg(event){
        this.msgToPublish = event.target.value;
        console.log( ' valu -- ' + this.msgToPublish );
    }
    handleSubscribe( event ) {
        console.log( ' payload -- ' + this.msgToPublish );
        const payload = { valu: this.msgToPublish };
        publish( this.messageContext, LWCMC, payload );
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                LWCMC,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.receivedMessage = message.valu;
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
}