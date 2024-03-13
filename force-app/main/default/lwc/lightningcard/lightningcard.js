import { LightningElement,wire,track } from 'lwc';
import userCons from '@salesforce/apex/ContactListController.getContacts';
export default class Lightningcard extends LightningElement {
    textValue;
    InputValue;
    @track conList = [];
    @track spinner = false;
    handleInputFocus(event) {
        // modify parent to properly highlight visually
        const classList = event.target.parentNode.classList;
        classList.add('lgc-highlight');
    }

    handleInputBlur(event) {
        // modify parent to properly remove highlight
        const classList = event.target.parentNode.classList;
        classList.remove('lgc-highlight');
    }

    handleInputChange(event) {
        this.textValue = event.detail.value;
        this.InputValue = event.target.value;
        console.log(' Input val -- '+this.InputValue);
    }
    handleSearchClick(event) {
        this.InputValue = event.target.value;
        userCons({
            'InputText': this.this.InputValue
        })
        .then(suc => {
            console.log(JSON.stringify(suc));
            if (suc != null) {
                if (suc.length > 0) {
                    this.Message = null;
                    this.conList = suc;
                } else {
                    this.conList = [];
                    this.Message = 'No Result Found...';
                }
            }
            this.spinner = false;
        }).catch(err => {
            alert('Please Check with Administrator!');
        });
    }
    handleClick(event) {
        // this won't run when you click the remove button
        alert('The pill was clicked!'+this.InputValue);
    }
    handlelookupdata( event ) {
        alert( ' val -- ' + event.target.value );
    }
}