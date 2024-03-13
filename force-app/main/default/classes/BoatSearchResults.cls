public class BoatSearchResults {
    @AuraEnabled
    public static list<BoatType__c> getBoatTypes(){
        return [SELECT Id, Name, OwnerId FROM BoatType__c];
    }
    
    @AuraEnabled
    public static list<Boat__c> getBoats(string boatTypeId){
        if(boatTypeId.equalsIgnoreCase('')){
            return [SELECT Id, Name, Contact__c, BoatType__c, Description__c, Geolocation__Latitude__s, Geolocation__Longitude__s, Geolocation__c, 
                      Length__c, Picture__c, Price__c, Year_Built__c FROM Boat__c];
        }
        else{
            return[SELECT Id, Name, Contact__c, BoatType__c, Description__c, Geolocation__Latitude__s, Geolocation__Longitude__s, Geolocation__c, 
                      Length__c, Picture__c, Price__c, Year_Built__c FROM Boat__c where BoatType__c =: boatTypeId];
        }
    }
}