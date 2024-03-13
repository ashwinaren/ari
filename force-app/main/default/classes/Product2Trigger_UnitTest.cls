@isTest
global class Product2Trigger_UnitTest {
	@isTest
    global static void Method1(){
        test.startTest();
        Product2 p = new Product2(Name='T1', StockKeepingUnit='A', Initial_Inventory__c=2.0, Quantity_Ordered__c=1.0);
        insert p;
        p.name='T2';
        update p;
        test.stopTest();
    }
}