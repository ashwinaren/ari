import { LightningElement, track, api, wire } from "lwc";
import { refreshApex } from '@salesforce/apex';
import getStudentdata from '@salesforce/apex/st_studentCls.getStudents';
import InsertStudents from '@salesforce/apex/st_studentCls.InsertStudents';
import DeleteStudents from '@salesforce/apex/st_studentCls.DeleteStudents';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class BulkDataInputLWC extends LightningElement {
	@track _columns = [];
	@track _data = [];
	@track _inputColumns;
	@track studentInfo;
	selectedIds;
	refreshTable = false;
	@wire(getStudentdata)
	students( { error, data } ) {
		if ( data ) {
            this.studentInfo = data.map( row => ( { ...row, recordTypeName: row.RecordType.Name } ) );
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.studentInfo = undefined;
        }
	}
	@api
	get columns() {
		return this._columns;
	}

	set columns(value) {
		this._columns = value;
		if (value) {
			let tempCols = [...value];
			tempCols.push({type: "button-icon", typeAttributes: {iconName: "utility:delete", name: "delete", iconClass: "slds-icon-text-error"}, fixedWidth: 50});
			this._columns = tempCols;
			let colData = JSON.parse(JSON.stringify(value));
			colData = colData.filter((column) => column.fieldName);
			colData.forEach((element) => {
				if (this.tempRow.hasOwnProperty(element.fieldName)) {
                    element.displayValue = this.tempRow[element.fieldName];
				}
			});
			this._inputColumns = colData;
		}
	}

	@track showModal;
	@track tempRow = {};
	editMode = false;

	handleRowAction( event ) {
		if (event.detail.action.name === "delete") {
			this.deleteSelectedRow(event.detail.row);
		}
	}

	handleInputChange(event) {
		this.tempRow[event.target.name] = event.target.value;
	}

	getSelectedByName( event ) {
		this.selectedIds = event.detail.selectedRows;
        for (let i = 0; i < this.selectedIds.length; i++){
			console.log( "You selected: " + this.selectedIds[i].Name );
        }
	}

	async deleteSelectedRow(deleteRow) {
		let newData = this.studentInfo;
		newData = newData.filter( ( row ) => row.Id === deleteRow.Id );
		let updatedFields = newData;
        const notifyChangeIds = updatedFields.map( row => { return { "recordId": row.Id } } );
        try {
            await DeleteStudents({ delstudentList: updatedFields });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Successfully Deleted',message: 'Students Deleted',variant: 'success'
                })
            );
            getRecordNotifyChange(notifyChangeIds);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while Deleting or refreshing records',message: error.body.message,variant: 'error'
                })
            );
        }
	}

	async handleDeleteRow( event ) {
		this.tempRow = {};
		let tempInput = [...this._inputColumns];
		tempInput.forEach((element) => (element.displayValue = undefined));
		this._inputColumns = tempInput;
		const updatedFields = this.selectedIds;
        const notifyChangeIds = updatedFields.map( row => { return { "recordId": row.Id } } );
        try {
            await DeleteStudents({ delstudentList: updatedFields });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Successfully Deleted All',message: 'Students Deleted All',variant: 'warning'
                })
            );
            getRecordNotifyChange(notifyChangeIds);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while Deleting or refreshing records',message: error.body.message,variant: 'error'
                })
            );
        }
	}

	handleCancel() {
		this.tempRow = {};
		this.showModal = false;
		this.editMode = false;
		this.editIndex = undefined;
	}
	handleAddRow() {
		this.tempRow = {};
		let tempInput = [...this._inputColumns];
		tempInput.forEach((element) => (element.displayValue = undefined));
		this._inputColumns = tempInput;
		this.showModal = true;
	}

	async handleSave() {
		const allValid = [...this.template.querySelectorAll(`lightning-input`)].reduce((validSoFar, inputCmp) => {
			inputCmp.reportValidity();
			return validSoFar && inputCmp.checkValidity();
		}, true);

		if (!allValid) {
			return;
		}

		let newData = JSON.parse(JSON.stringify(this._data));
		if (!this.editMode) {
			this.tempRow.uid = this._data.length + 1;
			newData.push(this.tempRow);
		} else {
			newData[this.editIndex] = this.tempRow;
			this.editIndex = undefined;
			this.editMode = false;
		}
		this._data = newData;
		this.tempRow = {};
        this.showModal = false;
        const updatedFields = this._data;
        const notifyChangeIds = updatedFields.map( row => { return { "recordId": row.Id } } );
        try {
            await InsertStudents({ InstudentList: updatedFields });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',message: 'Students Inserted',variant: 'success'
                })
            );
            getRecordNotifyChange(notifyChangeIds);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while updating or refreshing records',message: error.body.message,variant: 'error'
                })
            );
        }
	}
}