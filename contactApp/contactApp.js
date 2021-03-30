import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import {updateRecord} from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';

const columns = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true }
];

export default class ContactApp extends LightningElement {
    error;
    columns = columns;
    visibleContacts

    draftValues = []

    @wire(getContactList)
    contacts;

    handleSave(event){
        console.log(event.detail.draftValues);
        const recordInputs = event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft)
            return {fields}
        })
        console.log("recordInputs: ",recordInputs);

        const promises = recordInputs.map(recordInput => updateRecord(recordInput))
        Promise.all(promises).then(result=>{
            console.log("success");
            this.draftValues=[];
            return refreshApex(this.contacts);
        }).catch(error=>{
            console.log("failed");
        })
    }

    updateContactHandler(event){
        this.visibleContacts=[...event.detail.records]
        console.log(event.detail.records)
    }

    refreshTodoList(){
        refreshApex(this.contacts);
    }

   
}

