public class ContactAuraController {
     
    @AuraEnabled
    Public static List<Contact> getContactList(){
        //get all contact list
        List<Contact> conList = [SELECT Id, Name, Account.Name, Phone, Email FROM Contact LIMIT 10];
        return conList;
    }
}