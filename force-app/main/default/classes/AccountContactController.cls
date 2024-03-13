public class AccountContactController{
     
    @AuraEnabled
    public static AccountContactListWrapper getAccountWithContacts(String accountId){
        AccountContactListWrapper accWrapper = new AccountContactListWrapper();
        List<Account> accList = [SELECT Id, Name, BillingState, Website, Phone,
                                    (SELECT Id, FirstName, LastName, Email From Contacts)
                                    FROM Account WHERE Id =: accountId];
        if(!accList.isEmpty()){
            accWrapper.accRecord = accList[0];
            accWrapper.contactList = accList[0].Contacts;
            accWrapper.contactCount = accList[0].Contacts.size();
        }
        return accWrapper;
    }
     
    // wrapper class with @AuraEnabled and {get;set;} properties 
    public class AccountContactListWrapper{
        @AuraEnabled
        public Account accRecord{get;set;}
        @AuraEnabled
        public List<Contact> contactList{get;set;}
        @AuraEnabled
        public Integer contactCount{get;set;}
    }
}