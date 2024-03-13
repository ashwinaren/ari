global class tempBatch implements Database.Batchable<SObject> {
    global String query;
    global Database.QueryLocator start(Database.BatchableContext BC) {
        query = 'SELECT Email, Account.Name FROM Contact WHERE Email = null';
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext BC, List<SObject> batchRecords) {
        CustomerServices.myFutureMethod();
    }
    global void finish(Database.BatchableContext BC) {}
}