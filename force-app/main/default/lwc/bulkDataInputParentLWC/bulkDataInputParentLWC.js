import { LightningElement } from 'lwc';
const OPTIONS = [
    {label: "B.Sc computers", value: "B.Sc computers"},
    {label: "B.Com", value: "B.Com"},
    { label: "B.Tech", value: "B.Tech" },
    { label: "BBM", value: "BBM" },
    {label: "BBA", value: "BBA"}
]
export default class BulkDataInputParentLWC extends LightningElement {
    cols = [
        { label: 'Full Name', fieldName: 'Name', editable: true},
        { label: 'Course', fieldName: 'Course__c', editable: true, isPicklist: true, options: OPTIONS },
        { label: 'Course Fee', fieldName: 'Course_Fee__c', editable: true, type: 'currency'},
        { label: 'DOB', fieldName: 'DOB__c', editable: true,type: "date" ,typeAttributes: {  
                                                                                day: 'numeric',  
                                                                                month: 'short',  
                                                                                year: 'numeric',  
                                                                                hour: '2-digit',  
                                                                                minute: '2-digit',  
                                                                                second: '2-digit',  
                                                                                hour12: true} },
    ];

}