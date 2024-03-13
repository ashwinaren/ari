public class LeadAuraController {
     
    /*@AuraEnabled
    Public static List<Lead> getLeadList(){
        //get all Leads list
        List<Lead> leaList = [SELECT Id, Name,  Phone, Email FROM Lead limit 10];
        return leaList;
    }*/

    @AuraEnabled
    Public static list<BDXUser> getLeadList(Id leaId){
        //get all Leads list
        list<BDXUser> bdxUserList = new list<BDXUser>();
        system.debug('Lead Id --> '+leaId);
        List<Lead> leaList = [SELECT Id, Name,  Phone, Email FROM Lead where Id =: leaId];
        system.debug('Lead --> '+leaList);
        //return leaList;
    
    
    for(Lead ia : leaList){
            BDXUser bdx = new BDXUser();
            bdx.UserType = 'Name';
        	bdx.UserId = ia.Id;
            bdx.User = leaList[0].Name ;
            bdxUserList.add(bdx);
            BDXUser bdx1 = new BDXUser();
            bdx1.UserType = 'Phone';
        	bdx1.UserId = ia.Id;
            bdx1.User = ia.Phone ;
            bdxUserList.add(bdx1);
            BDXUser bdx2 = new BDXUser();
            bdx2.UserType = 'Email';
       		bdx2.UserId = ia.Id;
            bdx2.User = ia.Email ;
            bdxUserList.add(bdx2);
            system.debug('bdxUser ---> '+bdxUserList);
        }
        return bdxUserList;
        //return bdx;
	}
    @AuraEnabled
    Public static boolean updateLead(/*Id lId,string status*/){
        system.debug('Inside update class');
        /*Lead leaList = [SELECT Id, Name,Lead_Status__c, Phone, Email FROM Lead where name='Bertha Boxer'];
        leaList.Lead_Status__c = 'Unknown';
        update leaList;*/
        return true;    
        //return lId;
    }
    public class BDXUser {
        @AuraEnabled
        public String UserType{get;set;}
        @AuraEnabled
        public String User{get;set;}
        @AuraEnabled
        public String UserId{get;set;}
    }
}