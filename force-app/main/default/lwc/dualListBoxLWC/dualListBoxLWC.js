import {LightningElement, track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Task';
import INDUSTRY_FIELD from '@salesforce/schema/Task.Task_Type__c';

export default class DualListBoxLWC extends LightningElement {
    @track _selected = []; // this array tracks the seleted values

    // Getting Account Object info using wire service
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    // Getting Pickvalues based on default recordtype using wire service
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD})
    IndustryValues;

    // assigning none if you are not seleted any values
    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    // Handling the change event
    handleChange(event) {
        this._selected = event.detail.value;
    }
}