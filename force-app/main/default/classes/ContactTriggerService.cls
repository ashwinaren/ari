public class ContactTriggerService {
    public static void updateContact(list<contact> oldList,list<contact> newList,map<Id,contact> oldMap,map<Id,contact> newMap){
        system.debug(' ***** Inside Contact Service');
        for(contact c:newList){
            if(oldList.isEmpty()){
                system.debug(' ***** Inside Contact Service Insert');
                c.MobilePhone='0000012345';
            }
            if(oldList.isEmpty()){
                system.debug(' ***** Inside Contact Service Update');
                if(oldmap.get(c.Id).HomePhone!=null){
                    c.MobilePhone=c.HomePhone;
                }
            } 
        }
    }
}