import { LightningElement, wire, track } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import LEAD_OBJECT from '@salesforce/schema/Lead';

export default class DependentPickListInLWC extends LightningElement {

    // Reactive variables
    @track controllingVal = [];
    @track controllingValues = [];
    @track dependentVal = [];
    @track dependentValues = [];
    @track selectedStatus;
    @track selectedCountry;
    @track selectedState;
    @track isEmpty = false;
    @track error;
    controlValues;
    controlVal;
    totalDependentValues = [];
    totalDependentVal = [];

    // Account object info
    @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    objectInfo;

    // Picklist values based on record type
    @wire(getPicklistValuesByRecordType, { objectApiName: LEAD_OBJECT, recordTypeId: '$objectInfo.data.defaultRecordTypeId'})
    countryPicklistValues({error, data}) {
        if(data) {
            this.error = null;
            let statusOptions = [{label:'--None--', value:'--None--'}];

            // Lead Status Control Field Picklist values
            data.picklistFieldValues.Lead_Status__c.values.forEach(key => {
                statusOptions.push({
                    label : key.label,
                    value: key.value
                })
            });
            console.log('Status-->'+statusOptions);
            this.controllingVal = statusOptions;
            console.log('Status-->'+this.controllingVal);
            let countyOptions = [{label:'--None--', value:'--None--'}];

            // Account Country Control Field Picklist values
            data.picklistFieldValues.Closed_reason__c.values.forEach(key => {
                countyOptions.push({
                    label : key.label,
                    value: key.value
                })
            });
            console.log('closed reason-->'+countyOptions);
            this.controllingValues = countyOptions;

            let stateOptions = [{label:'--None--', value:'--None--'}];
            // Status CloseReason Control Field Picklist values
            this.controlVal = data.picklistFieldValues.Closed_reason__c.controllerValues;
            console.log('control val -->'+this.controlVal);
            // Status Closereason dependent Field Picklist values
            this.totalDependentVal = data.picklistFieldValues.Closed_reason__c.values;
            console.log(' dependent val --> '+this.totalDependentVal);
             // Account State Control Field Picklist values
            this.controlValues = data.picklistFieldValues.Lead_Close_Reason__c.controllerValues;
            // Account State dependent Field Picklist values
            this.totalDependentValues = data.picklistFieldValues.Lead_Close_Reason__c.values;

            this.totalDependentValues.forEach(key => {
                stateOptions.push({
                    label : key.label,
                    value: key.value
                })
            });
            console.log('close reason -->'+stateOptions);
            this.dependentValues = stateOptions;
        }
        else if(error) {
            this.error = JSON.stringify(error);
        }
    }
    handleStatusChange(event) {
        // Selected Status Value
        alert('before handleStatus -->'+ this.selectedStatus);
        this.selectedStatus = event.target.value;
        alert('inside handleStatus -->'+ this.selectedStatus);
        this.isEmpty = false;
        let dependVal = [];
        if(this.selectedStatus) {
            // if Selected Status is none returns nothing
            if(this.selectedStatus === '--None--') {
                this.isEmpty = true;
                dependVal = [{label:'--None--', value:'--None--'}];
                this.selectedStatus = null;
                this.selectedState = null;
                return;
            }

            // filter the total dependent values based on selected country value 
            this.totalDependentVal.forEach(conVal => {
                if(conVal.validFor[0] === this.controlValues[this.selectedStatus]) {
                    dependVal.push({
                        label: conVal.label,
                        value: conVal.value
                    })
                    console.log('status values inside loop -->'+dependVal);
                }
            })

            this.dependentVal = dependVal;
            console.log('Status values outside loop --> '+this.dependentVal);
        }
    }
    handleCountryChange(event) {
        // Selected Country Value
        this.selectedCountry = event.target.value;
        this.isEmpty = false;
        let dependValues = [];

        if(this.selectedCountry) {
            // if Selected country is none returns nothing
            if(this.selectedCountry === '--None--') {
                this.isEmpty = true;
                dependValues = [{label:'--None--', value:'--None--'}];
                this.selectedCountry = null;
                this.selectedState = null;
                return;
            }

            // filter the total dependent values based on selected country value 
            this.totalDependentValues.forEach(conValues => {
                if(conValues.validFor[0] === this.controlValues[this.selectedCountry]) {
                    dependValues.push({
                        label: conValues.label,
                        value: conValues.value
                    })
                    console.log('Closed reason inside loop --> '+dependValues);
                }
            })
           
            this.dependentValues = dependValues;
            console.log('Closed reason outside loop --> '+this.dependentValues )
        }
    }

    handleStateChange(event) {
        this.selectedState = event.target.value;
    }
}