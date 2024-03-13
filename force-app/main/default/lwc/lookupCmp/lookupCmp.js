import { LightningElement,track,wire,api } from 'lwc';
import lookupData from '@salesforce/apex/LookupController.lookupData';
//import scheduledUserRes from '@salesforce/apex/LPL_BDTaskHandler.getUsername';

export default class lookupCmp extends LightningElement {
    @api schUsr;
    @api selectedRecord;
    @track RecordList = [];
    @track SearchKeyword = '';
    @track Message = null;
    @track showList = false;
    @track spinner = false;
    @api displayName = '';
    @api objectName = 'Contact';
    @api filter = '';
    @api LA;


    @track alertmsg = '';
    @track shwalert = false;
    @track alertStyle = '';

    @api
    getRecordId() {
        return this.selectedRecord.Id;
    }

    @api
    checkValidity() {
        if (this.selectedRecord != null) {

            return true;
        } else {

            return false;
        }
    }
    connectedCallback() {
        if(this.schUsr){
            console.log('Inside lookup Cmp --> '+this.schUsr);
            scheduledUserRes({ userId:this.schUsr})
            .then(suc => {
                console.log(JSON.stringify('Apex Res Sch User -->'+suc));
                if (suc != null) {
                    if (suc.length > 0) {
                        this.Message = null;
                        this.selectedRecord = suc;

                    } else {
                        this.selectedRecord = 'Not Fecthed';
                        this.Message = 'No Result Found...';
                    }
                }
                this.spinner = false;
            }).catch(err => {
                alert('No Scheduled User');
            });
        }
    }
    @api
    reportValidity() {
        if (this.alertmsg == '') {
            this.alertStyle = '';
            this.shwalert = false;
        } else {
            this.alertStyle = 'border-color:red';
            this.shwalert = true;
        }
    }

    @api
    setCustomValidity(msg) {
        this.alertmsg = msg;
    }

    onblur() {
        let blurInt = setInterval(() => {
            clearInterval(blurInt);
            this.RecordList = [];
            this.showList = false;
            this.template.querySelector('[data-id="searchRes"]').className = this.template.querySelector('[data-id="searchRes"]').className.replace('slds-is-close', 'slds-is-open');
        }, 200);

    }
    clear() {
        this.selectedRecord = null;
        this.dispatchEvent(new CustomEvent('handlelookupdata', {
            detail: this.selectedRecord
        }));
        this.SearchKeyword = '';
        this.showList = false;
        this.onfocus();
    }
    onfocus() {

    }
    keyPressController(event) {
        if (event.target.value == null || event.target.value == undefined || event.target.value == '') {
            this.showList = false;
            return;
        }
        this.showList = true;
        this.spinner = true;
        this.SearchKeyword = event.target.value;
        this.collectlookupData();
    }

    collectlookupData() {

        console.log(this.SearchKeyword);
        this.showList = true;
        console.log('Key --> '+this.SearchKeyword+' obj --> '+this.objectName+' showList '+this.showList);
        if(this.showList==true && this.objectName=='Contact'){
            console.log('showtask --> '+this.showList);
        }
        lookupData({
                'ObjectName': this.objectName,
                'SearchText': this.SearchKeyword,
                'ObjectFilter': this.filter,
                'LA': (this.LA == null || this.LA == undefined ? false : true)
            })
            .then(suc => {
                //console.log(JSON.stringify(suc));

                console.log(this.template.querySelector('[data-id="searchRes"]'));
                if (suc != null) {
                    if (suc.length > 0) {
                        this.Message = null;
                        this.RecordList = suc;

                    } else {
                        this.RecordList = [];
                        this.Message = 'No Result Found...';
                    }


                }
                this.spinner = false;
            }).catch(err => {
                alert('Please Check with Administrator!');
            });
    }
    onselectData(event) {
        let itemid = event.target.id.split('-')[0];
        //console.log('UserId --> ' + itemid);
        //console.log('template' + this.template.querySelector('[data-id="' + itemid + '"]'));
        this.dispatchEvent(new CustomEvent('handlelookupdata', {detail: itemid}));
        this.showList = false;
        if (this.template.querySelector('[data-id="' + itemid + '"]') != null) {
            this.selectedRecord = this.template.querySelector('[data-id="' + itemid + '"]').onClickRecord();
        }
    }
}