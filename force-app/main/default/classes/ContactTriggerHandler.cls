public class ContactTriggerHandler {
    public static void beforeInsert(list<contact> oldList,list<contact> newList,map<Id,contact> oldMap,map<Id,contact> newMap){
        ContactTriggerService.updateContact(null,newList,null,newMap);
    }
    public static void beforeUpdate(list<contact> oldList,list<contact> newList,map<Id,contact> oldMap,map<Id,contact> newMap){
        ContactTriggerService.updateContact(oldList,newList,oldMap,newMap);
    }
    public static void afterInsert(list<contact> oldList,list<contact> newList,map<Id,contact> oldMap,map<Id,contact> newMap){}
    public static void afterUpdate(list<contact> oldList,list<contact> newList,map<Id,contact> oldMap,map<Id,contact> newMap){}
}