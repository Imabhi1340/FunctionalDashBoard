import { LightningElement,api,wire} from 'lwc';
import getQueryResult from '@salesforce/apex/FunctionalDashboard1.getQueryResult';
import getQueryCount from '@salesforce/apex/FunctionalDashboard1.getQueryCount';
import { columnsList } from './columns';

export default class FunctionalDashboardTiles extends LightningElement {
    @api record;
    query;
    tileId;
    data =[{ id: '1', Name: 'John Doe', age: 28, country: 'USA' },
      { id: '2', Name: 'Jane Smith', age: 34, country: 'Canada' },
      { id: '3', Name: 'Alice Johnson', age: 23, country: 'Australia' }];
    count;
    offset = 0;
    listData;
    sortDirection ='asc';
    fieldName = 'Name';
    isLoading =true;
    dataList = [{ id: '1', Name: 'John Doe', age: 28, country: 'USA' },
      { id: '2', Name: 'Jane Smith', age: 34, country: 'Canada' },
      { id: '3', Name: 'Alice Johnson', age: 23, country: 'Australia' }];
    isRendered = false;
    showDataTale =false;
    /*columnsList = [{ label: 'Name', fieldName: 'Name' , sortable: true, type: 'text'},
      {
          type: 'action',
          typeAttributes: { rowActions: this.handleRowActions }
      }];*/
    connectedCallback() {
        this.query = this.record.Query_Name__c;
        this.tileId = this.record.Id;
    }
    /**
     * 
     */
    @wire(getQueryCount, { query: '$query'})
    wiredData1({ error, data }) {
      if (data) {
        const {expr0} = data[0];
        this.count =  expr0;
          if(this.count>10){
            const event = new CustomEvent('risk', {
              detail: {isRed : true, tileId : this.tileId} 
          });
          this.dispatchEvent(event);
        }
      }
         else if (error) {
         console.error('Error:', error);
      }
    }
    
    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        const sortedData = [...this.dataList];
        
        this.fieldName = fieldName;
        this.sortedDirection = sortDirection;
        this.data = this.sortData(fieldName, sortDirection);    
      }

    /**
     * 
     */
    openDataTable(event) {
        if(this.record.Show_DataTable__c){
          this.showDataTale=true;
        }
    }
    closeModal(event){
      this.showDataTale =false;
    }

    loadMoreData(event) {
      if (this.data.length >= this.count) {
        event.target.enableInfiniteLoading = false;
      }
      else{
                this.offset = this.data.length;
      }
  }

  @wire(getQueryResult, {query: '$query', offset: '$offset'})
    wiredData({ error, data }) {
        if (data) {
          this.data = [...this.data, ...data];
        }else if (error) {
            console.error('Error fetching accounts', error);
        }
    }
}