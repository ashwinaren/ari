@isTest
private with sharing class OrderTests {

    @testSetup 
    private static void SetupTestData (){    
        TestDataFactory.InsertTestData(5);   
    } 

    @isTest 
    private static void OrderExtension_UnitTest() {
        PageReference pageRef = Page.OrderEdit;
        Test.setCurrentPage(pageRef);
       // SetupTestData();
        order od = [select id from order limit 1];
        ApexPages.StandardController stdcontroller = new ApexPages.StandardController(od);        
        OrderExtension ext = new OrderExtension(stdcontroller);        
        System.assertEquals(Constants.DEFAULT_ROWS, ext.orderItemList.size());
        ext.OnFieldChange();
        ext.SelectFamily();
        ext.Save();
        ext.First();
        ext.Next();
        ext.Previous();
        ext.Last();
        ext.GetHasPrevious();
        ext.GetHasNext();
        ext.GetTotalPages();
        ext.GetPageNumber();
        List<SelectOption> options = ext.GetFamilyOptions();
    }
    
   @isTest
private static void OrderUpdate_UnitTest(){
    //setupTestData();
    
   
    Test.startTest();
    list<order> orders = [select id,Status from order];
   // List<Order> orders = TestDataFactory.ConstructOrders();
    for (Order o : orders){
        o.Status = Constants.ACTIVATED_ORDER_STATUS;
    }
    List<Product2> oldProducts = [select id from product2];
   // List<Product2> oldProducts = TestDataFactory.ConstructProducts;
    Set<Id> productIds = new Set<Id>();
    for (Product2 oldProd : oldProducts){
        productIds.add(oldProd.Id);
    }
    oldProducts = [SELECT Id, Quantity_Ordered__c FROM Product2 WHERE ID IN :productIds];
    Map<Id, Integer> quantities = new Map<Id, Integer>();
    list<OrderItem> orderitmlst = [select id,PricebookEntryId,Quantity from OrderItem];
    List<PricebookEntry> pricebookentries = TestDataFactory.ConstructPricebookEntries(oldProducts);
   // for (OrderItem oi : TestDataFactory.orderItems){
    for (OrderItem oi : orderitmlst){
        Integer quantity = 0;
       // List<PricebookEntry> pricebookentries = TestDataFactory.pbes;
        for (PricebookEntry pbe : pricebookentries){
            if (oi.PricebookEntryId == pbe.Id){                
                if (quantities.containsKey(pbe.Product2Id)){
                    quantity = quantities.get(pbe.Product2Id);
                }
                quantity += (Integer)oi.Quantity;
                quantities.put(pbe.Product2Id, quantity);
                break;
            }
        }
    }
   
    update orders;
    Map<Id, Product2> currentProducts = new Map<Id, Product2>([Select Id, Quantity_Ordered__c FROM Product2 WHERE Id IN :productIds]);
  
    for (Product2 prod : oldProducts){
       // system.debug('');
        if(currentProducts.containsKey(prod.Id) && quantities.containsKey(prod.Id))
        {
            TestDataFactory.VerifyQuantityOrdered(prod, currentProducts.get(prod.Id), quantities.get(prod.Id));
        }
  }
  Test.stopTest();
}
}