trigger ContactTrigger on Contact (before insert,before update,before delete,after insert,after update,after delete,after undelete) {
    system.debug(' ***** Inside Trigger');
    if(trigger.isBefore){
        system.debug(' ***** Inside Before');
        if(trigger.isInsert){
            system.debug(' ***** Inside Before Insert');
            ContactTriggerHandler.beforeInsert(null,trigger.new,null,trigger.newMap);
        }
        if(trigger.isUpdate){
            system.debug(' ***** Inside Before Update');
            ContactTriggerHandler.beforeUpdate(trigger.old,trigger.new,trigger.oldMap,trigger.newMap);
        }
    }
    if(trigger.isAfter){
        system.debug(' ***** Inside After');
    }    
}