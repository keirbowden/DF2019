import { LightningElement, track, wire } from 'lwc';
import SearchContacts from '@salesforce/apex/SearchContacts.SearchContacts';

export default class searchContacts extends LightningElement {
    @track contacts;
    @track searchName = '';
    @track searchStr = '';

    @wire(SearchContacts, { searchStr: '$searchStr' })
    contacts;

    handleKeyChange(event) {
        const val = event.target.value;
        this.searchName = val;
    }

    searchClicked() {
        this.searchStr=this.searchName;
    }
}
