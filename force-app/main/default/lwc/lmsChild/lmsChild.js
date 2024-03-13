import { LightningElement, wire } from 'lwc';
import { MessageContext } from 'lightning/messageService';
import {publishMC, subscribeMC, unsubscribeMC} from 'c/lmsShared1';
export default class LmsChild extends LightningElement {
    subscription = null;
    msgToPublish;
    receivedMessage='';
    markVal=[{name:'456'}];
    @wire(MessageContext) messageContext;
    handleSubscribe() {
       console.log(' Clicked subscribe ');
       if ( this.subscription ) {
            console.log(' Inside Child Unsubscribe  -- ');
            unsubscribeMC(this.subscription);
            this.subscription = null;
        }
       else {
           console.log(' Clicked child subscribe else ');
            subscribeMC(this.messageContext, (subscription, message) => {
                this.subscription = subscription;
                this.receivedMessage = message.lmsData.message;
                console.log(' Inside Child Subscribe  -- '+this.subscription+' '+this.receivedMessage);
            });
        }
    }
   setMsg(event){
    this.msgToPublish = event.target.value;
    }
    handlePublish() {
        console.log(' Inside Child publish  -- '+this.msgToPublish);
        publishMC(this.messageContext, this.msgToPublish, this.markVal);
    }  
}