import { APPLICATION_SCOPE, subscribe, unsubscribe, publish } from 'lightning/messageService';
import LWCMC from '@salesforce/messageChannel/LWCMessageChannel__c';

const subscribeMC = (messageContext, callbk) => {
    const subscription = subscribe(
        messageContext, LWCMC, (message) => {
            callbk(subscription, message)
        }, {scope: APPLICATION_SCOPE});
}

const unsubscribeMC = (subscription) => {
    unsubscribe(subscription);
}

const publishMC = (messageContext, lmsMsg, lmsChannelType) => {
    const message = {
        cityName:{
            message: lmsMsg,
        },
        mapMarks: lmsChannelType
    };
    console.log(' message -- '+JSON.stringify(message));
    publish(messageContext, LWCMC, message);
}

export {publishMC, subscribeMC, unsubscribeMC};