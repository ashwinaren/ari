@isTest
public class ContactBatchTest {

    static TestMethod void UnitTest1() {

        Account a = new Account();         
        a.Name = 'Test Dealer';  
        insert a;

        List<Contact> tstCont = new List<Contact>();
        for(integer i = 0; i < 25; i++) {
            Contact c = new Contact(AccountId = a.Id,LastName = 'NotFirstName'+i);
            tstCont.add(c);
        }
        insert tstCont;

        Test.startTest();
        ContactBatch cb = new ContactBatch();
		Database.QueryLocator ql = cb.start(null);
		cb.execute(null,tstCont);
		cb.Finish(null);
        //Database.executeBatch(cont);
        Test.stopTest();
    }
}