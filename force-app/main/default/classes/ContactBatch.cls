global class ContactBatch implements Database.Batchable<SObject> {
    global String query;
    global Database.QueryLocator start(Database.BatchableContext BC) {
        query = 'SELECT Email, Account.Name FROM Contact WHERE Email = null';
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext BC, List<SObject> batchRecords) {

        Map<String, Schema.RecordTypeInfo> CON_RECORD_TYPES = Schema.SObjectType.Contact.getRecordTypeInfosByName();
        //String CON_RECORD_TYPES_ID = CON_RECORD_TYPES.get('PRIMARY DEALER').getRecordTypeId();

        for(SObject c : BatchRecords) {
            Contact con = (Contact)c;
            con.email= 'abc@xyz.xom';
            update con;
        }
        CustomerServices.myFutureMethod();
    }
    global void finish(Database.BatchableContext BC) {
        set<string> userSet = new set<string>();
		userSet.add(UserInfo.getUserId());
        CustomNotificationFromApex.notifyUsers(userSet, '00Q2v00001UvCjsEAF');
    }
}