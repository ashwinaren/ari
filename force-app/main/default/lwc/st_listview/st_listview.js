import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import getStudentdata from '@salesforce/apex/st_studentCls.getStudents';
import updateStudents from '@salesforce/apex/st_studentCls.updateStudents';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const COLS = [
    { label: 'Full Name', fieldName: 'Name', editable: true,tooltip:'Normal text' },
    { label: 'Course', fieldName: 'Course__c', editable: true },
    { label: 'Course Fee', fieldName: 'Course_Fee__c', editable: true, type: 'currency'},
    { label: 'DOB', fieldName: 'DOB__c', editable: true,type: "date" ,typeAttributes: {  
                                                                            day: 'numeric',  
                                                                            month: 'short',  
                                                                            year: 'numeric',  
                                                                            hour: '2-digit',  
                                                                            minute: '2-digit',  
                                                                            second: '2-digit',  
                                                                            hour12: true} },
    { label: 'Record Type', fieldName: 'recordTypeName', type: "text"}
                                                                                
];
export default class St_listview extends LightningElement {
    studentInfo;
    mainstudentInfo;
    recTypelist = [];
    uniqueArray = [];
    recArray = [];
    columns = COLS;
    draftValues = [];
    @wire(getStudentdata)
    students({ error, data }) {
        if ( data ) {
            // by default it will return recordId , we are parsing to recordtype.name to recordTypeName
            this.studentInfo = data.map( row => ( { ...row, recordTypeName: row.RecordType.Name } ) );
            // storing the main data into mainstudentInfo for future use
            this.mainstudentInfo = this.studentInfo;
            //getting the recordTypeName field data to recTypelist array
            this.recTypelist = this.studentInfo.map( row => row.recordTypeName );
            // filter the unique recordtype names from the recTypelist array & storing in uniqueArray
            this.uniqueArray = this.recTypelist.filter( ( v, i, a ) => a.indexOf( v ) === i );
            // to use the array in ligtning-combobox we need it label,value format we will get from pickListValueGenerator function
            this.recArray = this.pickListValueGenerator(this.uniqueArray);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.studentInfo = undefined;
        }
    }
    handleStateChange( event ) {
        // event.detail.value we will selected picklist value
        var selectedVal = event.detail.value;
        if ( selectedVal === 'All' ) {
            this.studentInfo = this.mainstudentInfo;
            alert(' You selected '+selectedVal+' records ');
        } else {
            alert(' You selected '+selectedVal+' record type records');
            this.studentInfo = this.mainstudentInfo.filter( row => row.recordTypeName === selectedVal );
        }
    }
    // pickListValueGenerator accepts array and returns the data in (label,value) format
    pickListValueGenerator(data) {
        let picklistOptions = data.map(plValue => ({
            label: plValue,
            value: plValue
        }));
        picklistOptions.unshift({label:'All',value:'All'});   
        return picklistOptions;
    }
    async handleSave( event ) {
        // event.detail.draftValues contains the modified data
        const updatedFields = event.detail.draftValues;
        // Prepare the record IDs for getRecordNotifyChange()
        const notifyChangeIds = updatedFields.map( row => { return { "recordId": row.Id } } );
        try {
            // Pass edited fields to the updateContacts Apex controller
            await updateStudents({ studentList: updatedFields });
            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Students updated',
                    variant: 'success'
                })
            );
            // Refresh LDS cache and wires
            getRecordNotifyChange(notifyChangeIds);

            // Display fresh data in the datatable
            refreshApex(this.students).then(() => {
                // Clear all draft values in the datatable
                this.draftValues = [];
            });
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}