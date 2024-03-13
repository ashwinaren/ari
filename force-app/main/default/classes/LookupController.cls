public without sharing class LookupController {
    @AuraEnabled(cacheable=true)
    public static List<object> lookupData(String ObjectName,String SearchText,String ObjectFilter,Boolean LA){
        try{
            String Filter='';
            String query='';
            String nameOrMRIDQuery='';
            String crdNumberQuery='';
            Boolean showMRID=LA;
            List<object> resultsList=new List<object>();
            if(ObjectName=='Contact'){
                query='select Id,Account.Id,Account.Name,Name from '+ObjectName;
                if(SearchText==''){                    
                    query+=' order by Name Limit 100';
                    resultsList=Database.query(query);
                }
                else{                    
                    query+=' where Account.Id != null';                        
                    nameOrMRIDQuery= (showMRID?query+' AND (Name like \''+SearchText+'%\'' +SearchText+'%\')' +' order by Name Limit 100'
                                :query+' AND Name like \''+SearchText+'%\'' +' order by Name Limit 100');
                    resultsList= Database.query(nameOrMRIDQuery); 
                    if(resultsList.isEmpty()){ 
                        crdNumberQuery=query+SearchText+'%\'' +' order by Name Limit 100';                   
                        resultsList= Database.query(crdNumberQuery);
                    }                        
                }                                                     
                System.debug('resultsList ?????'+resultsList);
                return resultsList;
            }            
            else{                
                query='select Id,Name from '+ObjectName;
                query+=SearchText==''?' order by Name  Limit 100':' where Name like \''+SearchText+'%\''+Filter+ ' order by Name LIMIT 100';
                //return Database.query('select Id,Name from '+ObjectName+' where Name like \''+SearchText+'%\''+Filter+ ' Limit 100');
                return Database.query(query);
            }
        }catch(Exception ex){
            System.debug(ex);
            System.debug(ex.getMessage());
            System.debug(ex.getLineNumber());
        }
        return new List<Object>();
    }
}