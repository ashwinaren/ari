public class Product2Extension {



    //public List<Product2> productsToInsert {get;set;}

    public List<ProductWrapper> productsToInsert {get;set;}

    

    public Product2Extension(ApexPages.StandardController controller){

        productsToInsert = new List<ProductWrapper>();

        addRows();

    }



    public void AddRows(){

        for ( Integer i=0; i<Constants.DEFAULT_ROWS; i++ ){

            productsToInsert.add( new productWrapper() );

        }

    }

    //Get family options

    public List<SelectOption> GetFamilyOptions() {

        List<SelectOption> options = new List<SelectOption>{

            new SelectOption(Constants.SELECT_ONE, Constants.SELECT_ONE)

        };

        for (Schema.PicklistEntry ple : Constants.PRODUCT_FAMILY) {

            options.add(new SelectOption(ple.getValue(), ple.getLabel()));

        }

        return options;

    }

    

    public List<ChartHelper.ChartData> GetInventory(){

        return ChartHelper.GetInventory();

    }



    public PageReference Save(){

        Savepoint sp = Database.setSavepoint();

        try {

            List<Product2> products = new List<Product2>();

            List<PricebookEntry> entries = new List<PricebookEntry>();

            for (ProductWrapper wrp : productsToInsert){

                if(wrp.productRecord  != null && wrp.pricebookEntryRecord != null){

                    if(wrp.productRecord.Name != null && wrp.productRecord.Family != null && 

                        wrp.productRecord.Family != Constants.SELECT_ONE && wrp.productRecord.Initial_Inventory__c != null &&

                        wrp.pricebookEntryRecord.UnitPrice != null){

                        

                        products.add(wrp.productRecord);

                        PricebookEntry entry=wrp.pricebookEntryRecord;

                        entry.IsActive=true;

                        entry.Pricebook2Id=constants.STANDARD_PRICEBOOK_ID;

                        entries.add(entry);  

                    }

                }

            }

             insert products; 

             for (integer itr=0; itr<entries.size();itr++){

                entries[itr].Product2Id=products[itr].id;

            }

            insert entries;

            

            //If successful clear the list and display an informational message

            apexPages.addMessage(new ApexPages.message(ApexPages.Severity.INFO,productsToInsert.size()+' Inserted'));

            productsToInsert.clear();   //Do not remove

            addRows();  //Do not remove

        } catch (Exception e){

            Database.rollback(sp);

            apexPages.addMessage(new ApexPages.message(ApexPages.Severity.ERROR,constants.ERROR_MESSAGE));

        }

        return null;

    }

    //Product Wrapper Class

    public class ProductWrapper{

        public product2 productRecord {get;set;}

        public pricebookEntry pricebookEntryRecord{get;set;}

        public productWrapper(){

            productRecord = new product2(Initial_Inventory__c =0);

            pricebookEntryRecord = new pricebookEntry(Unitprice=0.0);

        }

    }



}