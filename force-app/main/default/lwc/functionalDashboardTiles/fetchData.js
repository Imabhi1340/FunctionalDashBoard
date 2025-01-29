export function fetchData1(query) {

    return new Promise((resolve) => {
        getQueryResult({ query: this.record.Query_Name__c})
              .then(result => {
                const mockData = [];
                    result.forEach(element => {
                    mockData.push({id:element.Id , Name:element.Name});
                  });
                })
                .catch(error => {
                  console.error('Error:', error);
                  });
                  resolve(mockData);
    });
}
