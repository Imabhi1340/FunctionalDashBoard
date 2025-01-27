import { LightningElement ,wire} from 'lwc';
import getSections from '@salesforce/apex/FunctionalDashboard1.getSections';

export default class FunctionaDashboardWrapper extends LightningElement {
    sectionData;
    tileCount;

    @wire(getSections)
    wiredData({ error, data }) {
      if (data) {
        this.sectionData = data;
        console.log('Data', data);
      } else if (error) {
        console.error('Error:', error);
      }
    }
}