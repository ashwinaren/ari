public with sharing class st_studentCls {
    @AuraEnabled(cacheable=true)
    public static list<Student__c> getStudents(){
        list<Student__c> studentList = new list<Student__c>();
        try {
            studentList=[select id,name,Full_Name__c,Course__c,Course_Fee__c,DOB__c,RecordType.Name,recordtypeId
            from Student__c 
            WITH SECURITY_ENFORCED limit 50];
        } catch (Exception e) {
            System.debug('An exception occurred: ' + e.getMessage());
        }
        
        if(studentList.size()>0){
            	system.debug(' get Vals -- '+studentList.size()+'  '+studentList);
                return studentList;
            }else{
                system.debug(' get Vals -- Null ');
                return null;
            }
    }
    @AuraEnabled
    public static void updateStudents(List<Student__c> studentList) {
        // Make sure we can update the database before trying to update
        if (!Schema.sObjectType.Student__c.isUpdateable()) {
            throw new SecurityException(
                'Insufficient permissions to update contacts'
            );
        }
        update studentList;
    }
    @AuraEnabled
    public static void InsertStudents(List<Student__c> InstudentList) {
        system.debug(' vals -- '+InstudentList.size()+'  '+InstudentList);
        // Make sure we can update the database before trying to update
        if (!Schema.sObjectType.Student__c.isCreateable()) {
            throw new SecurityException(
                'Insufficient permissions to Insert contacts'
            );
        }
        upsert InstudentList;// insert new records , If already record exists it will update
    }
    @AuraEnabled
    public static void DeleteStudents(List<Student__c> delstudentList) {
        system.debug(' vals -- '+delstudentList.size()+'  '+delstudentList);
        set<string> stIds = new set<string>();
        for(Student__c s:delstudentList){
            stIds.add(s.name);
            System.debug(' ids -- '+s.name);
        }
		Student__c[] delStudents = [SELECT Id FROM Student__c WHERE name In: stIds];
        system.debug(' query results -- '+delStudents.size()+'  '+delStudents);
		Database.DeleteResult[] DR_Dels = Database.delete(delStudents);
        Student__c[] totalStudents = [SELECT Id FROM Student__c WHERE Id In: stIds];
        system.debug(' query after del -- '+totalStudents.size()+'  '+totalStudents);
        // Make sure we can update the database before trying to update
        if (!Schema.sObjectType.Student__c.isDeletable()) {
            throw new SecurityException(
                'Insufficient permissions to Delete Students'
            );
        }
    }
}