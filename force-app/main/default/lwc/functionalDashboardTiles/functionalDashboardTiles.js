import { LightningElement,api} from 'lwc';
import getQueryResult from '@salesforce/apex/FunctionalDashboard1.getQueryResult';

export default class FunctionalDashboardTiles extends LightningElement {
    @api record;
    count;
    listData;
    isRendered = false;
    connectedCallback() {
        this.getQueryResults();
    }
    /**
     * 
     */
    getQueryResults() {
        getQueryResult({ query: this.record.Query_Name__c})
      .then(result => {
        this.count = result.length;
        this.listData = result;
        console.log('Result', result);
      })
      .catch(error => {
        console.error('Error:', error);
        });
    }
}