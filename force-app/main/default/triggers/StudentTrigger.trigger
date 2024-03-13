trigger StudentTrigger on Student__c (before insert) {
    if(trigger.isBefore && trigger.isInsert){
        for(Student__c c:trigger.new){
            if(c.Course_Fee__c<100){
                c.adderror('course fee 100$');
            }
        }   
    }
}