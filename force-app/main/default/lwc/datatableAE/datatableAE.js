import { LightningElement, api, track, wire } from 'lwc';

import getAccounts from '@salesforce/apex/DatatableAEController.getAccounts'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const actions = [
    { label: 'edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
    { label: 'Name', fieldName: 'accLink', type: 'url',
        typeAttributes: { label: {fieldName: 'name'} }
    },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class DatatableAE extends LightningElement {

    @api studySiteId;
    @track columns;
    @track wiredAccountsResult;
    @track data;

    connectedCallback() {
        this.columns = columns;
    }

    @wire (getAccounts) 
    wiredAccounts(result) {
        this.wiredAccountsResult = result;
        const { data, error } = result;
        if(data) {
            let accLink;
            this.data = result.data.map((item) => {
                accLink = '/${item.id}';
                return {
                    ...item,
                    accLink
                }
            });
        } else if (error) {
			const evt = new ShowToastEvent({
				message: result.error.body.message,
				variant: 'error'
			});
			this.dispatchEvent(evt);
		}
    }

}