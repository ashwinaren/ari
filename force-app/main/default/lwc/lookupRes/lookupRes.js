import {LightningElement,track,api} from 'lwc';

export default class LookupRes extends LightningElement {
    @api acc;
    @track accFlag;
    @api record;
    @api
    onClickRecord() {
        return this.record;
        const selectedEvent = new CustomEvent('selecteduser', { detail: this.record.id});
        this.dispatchEvent(new CustomEvent(selectedEvent));
    }
}