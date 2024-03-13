/** Ashwin */
trigger TaskTrigger on Task (after insert,after update) {
    set<id> contactIds = new set<id>();
    for(task t : trigger.new){
        contactIds.add(t.whoId);
    }
    system.debug('contactIds-->'+contactIds);
    list<task> inserttask = new list<task>();
	Map<Id,lead> mapleads = new Map<Id,lead>(); 
    list<lead> relatedleads =[SELECT Id,name,contact__r.Id FROM Lead where contact__r.id= : contactIds];
    for(lead l:relatedleads){
        mapleads.put(l.Contact__c,l);
    }
    system.debug('leads-->'+mapleads);
    if(trigger.isAfter){
       	if(trigger.isInsert){
    		for(task k:trigger.new) // one for lead & one for task
    			{ system.debug('inside for');
					if( mapleads.containskey(k.whoid) ) {
         				system.debug('inside map containskey');
                        if(!System.isFuture() && !System.isBatch()){
            				TaskHandler.InsertLeadTask(k.OwnerId,k.Status,k.WhoId,k.Subject);
                         }
        			}
    			}
    	}
    }
}