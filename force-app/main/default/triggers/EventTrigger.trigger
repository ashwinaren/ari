trigger EventTrigger on Event (after insert,after update) {
    set<id> contactIds = new set<id>();
    for(event t : trigger.new){
        contactIds.add(t.whoId);
    }
    system.debug('contactIds-->'+contactIds);
	Map<Id,lead> mapleads = new Map<Id,lead>(); 
    list<lead> relatedleads =[SELECT Id,name,contact__r.Id FROM Lead where contact__r.id= : contactIds];
    for(lead l:relatedleads){
        mapleads.put(l.Contact__c,l);
    }
    system.debug('leads-->'+mapleads);
    if(trigger.isAfter){
       	if(trigger.isInsert){
    		for(event k:trigger.new)
    			{ system.debug('inside for');
					if( mapleads.containskey(k.whoid) ) {
         				system.debug('inside map containskey');
                        if(!System.isFuture() && !System.isBatch()){
            				EventHandler.HandleEventInsert(k.OwnerId,k.WhoId,k.Subject,k.StartDateTime,k.EndDateTime);
                         }
        	}
    	}
    	}
    }
}