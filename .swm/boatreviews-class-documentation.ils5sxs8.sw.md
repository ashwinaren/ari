---
title: BoatReviews  Class Documentation
---
<SwmSnippet path="/force-app/main/default/classes/BoatReviews.cls" line="2">

---

This auraenabled method used to get all the boat reviews with id, If no Id fectches all the boat reviews. Edited

```apex
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
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXJpJTNBJTNBYXNod2luYXJlbg==" repo-name="ari"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
