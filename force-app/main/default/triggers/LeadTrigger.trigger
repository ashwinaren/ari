trigger LeadTrigger on Lead (before insert,before update,before delete,after insert,after update,after undelete) {
    list<lead> oldLead = trigger.old;// old version
    list<lead> newLead = trigger.new;// new version
    list<lead> updateLeadList = new list<lead> ();//contains leads with emailId changed
    list<contact> updateConList = new list<contact> ();
    map<id,contact> conMap = new map<id,contact>();
    set<id> conIds = new set<id>();    
    //map<id,list<lead>> newLeadMap = trigger.newMap();//new lead map
    /*if(trigger.isBefore){
        if(trigger.isInsert || trigger.isUpdate){
            for(lead l:newLead){
                if(l.email==NULL){
                    l.adderror('Please fill the email Id');
                }
            }
        }
    }*/
    if(trigger.isAfter){
        if(trigger.isUpdate){
            for(lead l:newLead){ // new lead
                lead	oldlead = Trigger.oldMap.get(l.ID);//old lead
                if(l.email!=oldlead.email){
                    updateLeadList.add(l);
                    //l.Contact__c.email = l.Email;
                }
            }
            for(lead l:updateLeadList){
                conIds.add(l.Contact__c);
            }
            list<contact> relatedConList = [select id,name,email from contact where Id IN :conIds limit 49999];
            for(contact c:relatedConList){
                conMap.put(c.Id, c);
            }
            
            for(lead l:updateLeadList){
                contact relatedCon = conMap.get(l.Contact__c);
                relatedCon.email=l.Email;
                updateConList.add(relatedCon);
            }
            if(updateConList.size()>0){
                update updateConList;
            }
        }
    }
}