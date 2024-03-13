public with sharing class ExcelImportController { 
    
    public virtual class BulkEmployeeException extends Exception {}     
    /*
	* @param base64Data : Content of the File in JSON format 
	* @param fileName : File Name 
	* @param contentType : Type of the File (Excel)
	*/
    @AuraEnabled
    public static void parseFile(String base64Data, String fileName) {
        System.debug('In ParseFile');
        try {
            System.debug('JSONfromJS::'+base64Data);
            System.debug('fileNamefromJS::'+fileName);
            
            Blob blobData = Blob.valueOf(base64Data);
            System.debug('blobData::'+blobData);
            
            createEmployeeBatchRecords(blobData);
            
        }catch(BulkEmployeeException e){
            System.debug('BulkEmployeeException::::'+e.getMessage());
            
        }catch (Exception e) {
            System.debug('Exception::::'+e);
        }
    }
    /**
* @description: This method is used to create the Claim Batch Stage records based on the CSV Data as Input
* @param blobData: Content of the File Uploaded by the User in Blob format 
*/
    public static void createEmployeeBatchRecords(Blob blobData)
    {
        String csvAsString;
        String[] csvFileLines;
        System.debug('blobData:::'+blobData);
        csvAsString = blobData.toString();
        system.debug('Before JSON Formator csvAsString::' + csvAsString);
        
        String csvAsString1 = jsonFormator(csvAsString);
        
        System.debug('After JSON Formator csvAsString1::'+csvAsString1);
        
        List<JSON2ApexController> objList = JSON2ApexController.parse(csvAsString1);
        System.debug('After JSON deserialize objList::'+objList);
        System.debug('objList[0]::'+objList[0]);
        
        List<Employee__c> batchEmployeeList = new List<Employee__c>();
        
        for(JSON2ApexController item: objList) {
            
            Employee__c batchEmployeeRecord = new Employee__c();
            
            batchEmployeeRecord.Name = item.EmployeeName;  
            batchEmployeeRecord.Email_Id__c = item.EmailId;
            batchEmployeeRecord.First_Name__c = item.FirstName;  
            batchEmployeeRecord.Last_Name__c = item.LastName;
            batchEmployeeRecord.Phone_Number__c = item.PhoneNumber;
            
            Date standardDate = convertDateToStandardDate(item.JoiningDate);
            batchEmployeeRecord.Joining_Date__c = standardDate;
            
            batchEmployeeList.add(batchEmployeeRecord);
        }
        
        try{
            database.insert(batchEmployeeList);
        } catch(Exception e) {
            System.debug('Insert Exception::::'+e.getMessage());
        }        
    }
    
    public static List<JSON2ApexController> parse(String jsonString) {
        return (List<JSON2ApexController>) System.JSON.deserialize(jsonString, List<JSON2ApexController>.class);
    } 
    
    public class JSON2ApexController {
        
        public String EmployeeName;
        public String EmailId;
        public String FirstName;
        public String LastName;
        public String PhoneNumber;
        public String JoiningDate;
        
    }
    
    public static String jsonFormator(String jsonString) {
        String target = 'Employee Name';
        String replacement = 'EmployeeName';
        String jsonString1 = jsonString.replace(target, replacement);
        target = 'Email Id';
        replacement = 'EmailId';
        jsonString1 = jsonString1.replace(target, replacement);
        target = 'First Name';
        replacement = 'FirstName';
        jsonString1 = jsonString1.replace(target, replacement);
        target = 'Last Name';
        replacement = 'LastName';
        jsonString1 = jsonString1.replace(target, replacement);
        target = 'Phone Number';
        replacement = 'PhoneNumber';
        jsonString1 = jsonString1.replace(target, replacement);
        target = 'Joining Date (DD-MMM-YY)';
        replacement = 'JoiningDate';
        jsonString1 = jsonString1.replace(target, replacement);
        
        return jsonString1;
    }
    
    public static Date convertDateToStandardDate(String inputDate){
        // input Date in format : 10-Feb-2019
        // inputDateArray (10,Feb,2019)
        try{
            String[] inputDateArray = inputDate.split('-');
            String monthInUpperCase = inputDateArray[1].toUpperCase(); 
            Integer month = 0;
            switch on monthInUpperCase {
                when 'JAN' { month = 1; } when 'FEB' { month = 2; } when 'MAR' { month = 3; } when 'APR' { month = 4; } when 'MAY' { month = 5; }
                when 'JUN' { month = 6; } when 'JUL' { month = 7; } when 'AUG' { month = 8; } when 'SEP' { month = 9; } when 'OCT' { month = 10; }
                when 'NOV' { month = 11; } when 'DEC' { month = 12; } when else { month = 0; }
            }
            Date todayDate = System.today();
            Date standardDate;
            String currentCentury = String.valueOf(todayDate.year()).substring(0,2);
            String finalYear = currentCentury+inputDateArray[2];
            if(month == 0){  throw new BulkEmployeeException('Invalid Date');
                          }else{
                              standardDate = Date.newInstance(Integer.valueOf(finalYear),month,Integer.valueOf(inputDateArray[0]));
                          }
            return standardDate;
        }catch(Exception e){
            throw new BulkEmployeeException('Exception:: '+inputDate);
        }
    }
}