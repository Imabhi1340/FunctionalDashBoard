public class FunctionalDashboard1 {
    @AuraEnabled(cacheable=true)
    public static List<Section__c> getSections() {
        return [SELECT Id,Name,(Select Id,Query_Name__c from Queries__r) FROM Section__c];
    }
        @AuraEnabled(cacheable=true)
    public static List<sObject> getQueryResult(String query) {
        return Database.query('Select Id from Account');
    }
}