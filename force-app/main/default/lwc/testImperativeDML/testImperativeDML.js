import { LightningElement } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.updateContact';
export default class TestImperativeDML extends LightningElement {
    connectedCallback() {
        let isupdate;
        console.log( ' I am connected' );
        findContacts()
            .then((result) => {
                isupdate = result;
                console.log( ' is update -- ' + isupdate );
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
            });        
    }
}