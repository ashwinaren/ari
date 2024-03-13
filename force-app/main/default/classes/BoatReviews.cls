public class BoatReviews {
	@AuraEnabled
    public static list<BoatReview__c> getAll(string boatId){
        if(boatId.equalsIgnoreCase('')){
            return [SELECT Name, Boat__c, Comment__c, Rating__c, Id,LastModifiedDate,CreatedDate,CreatedBy.Name,CreatedBy.SmallPhotoUrl,CreatedBy.CompanyName 
                    FROM BoatReview__c];
        }
        else{
            return[SELECT Name, Boat__c, Comment__c, Rating__c, Id,LastModifiedDate,CreatedDate,CreatedBy.Name,CreatedBy.SmallPhotoUrl,CreatedBy.CompanyName 
                    FROM BoatReview__c where Boat__c =: boatId];
        }
    }
}