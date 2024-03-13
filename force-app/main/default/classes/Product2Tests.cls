@isTest  (seeAllData=false)
private with sharing class Product2Tests {

    @testSetup 
    private static void SetupTestData (){    
        TestDataFactory.InsertTestData(5);   
    } 
    /**
     * @name product2Extension_UnitTest
     * @description UnitTest for product2Extension
    **/
  /*  @isTest
    private static void Product2Extension_UnitTest(){
// Set-up user
        String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
            LocaleSidKey='en_US', ProfileId = p.Id, TimeZoneSidKey='America/Los_Angeles', UserName=uniqueUserName);

        System.runAs(u) {
        
// When a user first visits the page, there should be multiple rows displayed on the screen. 
// Assert that the size of the productsToInsert list is equal to the DEFAULT_ROWS constant.
//      Test.StartTest(); 
            Product2 prod = new Product2(name='Test',isActive=true);
            ApexPages.StandardController stdc = new ApexPages.StandardController(prod);
            Product2Extension p2x = new Product2Extension(stdc);  
            PageReference pageRef = page.Product2New;       
           // System.assertEquals(Constants.DEFAULT_ROWS, p2x.productsToInsert.size());
            System.assert(p2x.productsToInsert.size() == Constants.DEFAULT_ROWS);

//      Test.StopTest();  

// When the Add button is clicked, an additional set of rows should be added, 
// so assert that the size of the productsToInsert ** list is double **DEFAULT_ROWS after the button is clicked once. 
//        Test.StartTest();
            p2x.addRows();
            System.assert(p2x.productsToInsert.size() == Constants.DEFAULT_ROWS * 2);

//      Test.StopTest();          

// Next, test the Save button. Verify that populated rows are saved and unpopulated rows are not saved. 
// Loop through the rows in the productsToInsert list and populate the values of the first 5 records, 
// and then simulate clicking the Save button. Verify that the button worked by asserting that only 5 products were saved.
        integer x = 0; 
        for (Product2Extension.ProductWrapper PTI : p2x.productsToInsert){
            pti.productrecord.name='TESTPRODUCT ' + x;
            pti.productRecord.IsActive = true;
            pti.productRecord.Initial_Inventory__c = 20;
            pti.productRecord.Family = Constants.PRODUCT_FAMILY[0].getValue();           
            pti.pricebookEntryRecord.UnitPrice = 10;
            
            x++; if (x==5) {break;}
        }

//        Test.startTest();
            p2x.save();
//        Test.stopTest();
        List<Product2> createdProducts = [SELECT Id FROM Product2];
        System.assertEquals(5, createdProducts.size());

// plus some more test areas        
        p2x.GetFamilyOptions();
        p2x.GetInventory();

    }
    }  */
    
    @isTest 
    private static void Product2Extension_UnitTest(){
        PageReference pageRef = Page.Product2New;
        Test.setCurrentPage(pageRef);
        Product2 prod = new Product2(name='Test',isActive=true);        
        ApexPages.StandardController stdcontroller = new ApexPages.StandardController(prod);        
        Product2Extension ext = new Product2Extension(stdcontroller);        
        System.assertEquals(Constants.DEFAULT_ROWS, ext.productsToInsert.size());
        
        ext.addRows();
        System.assertEquals(Constants.DEFAULT_ROWS * 2, ext.productsToInsert.size());
        
        for (Integer i = 0; i < 5; i++) {
            Product2Extension.ProductWrapper wrapper = ext.productsToInsert[i];
            
            Product2 testProduct = new Product2();
            testProduct.Name = 'Test Product ' + i;
            testProduct.IsActive = true;
            testProduct.Initial_Inventory__c = 20;
            testProduct.Family = Constants.PRODUCT_FAMILY[0].getValue();
            wrapper.productRecord = testProduct;
            
            PricebookEntry testEntry = new PricebookEntry();
            testEntry.IsActive = true;
            testEntry.UnitPrice = 10;
            wrapper.pricebookEntryRecord = testEntry;
        }
        
        Test.startTest();
        ext.save();
        Test.stopTest();
        
        ext.GetFamilyOptions();
        ext.GetInventory();
        List<Product2> createdProducts = [
            SELECT
                Id
            FROM
                Product2
        ];
        System.assertEquals(10, createdProducts.size());
    }
    
    @isTest 
    private static void Product2Trigger_UnitTest()
    {
        Test.startTest();
        
        Product2 p=new Product2();
        p.Name='TestProduct';
        p.Family='Side';
        p.IsActive=true;
        p.Quantity_Ordered__c =100;
        p.Initial_Inventory__c =10;
        insert p;
        
        p.Quantity_Ordered__c=200;
        update p;
            
        Test.stopTest();
    }
}