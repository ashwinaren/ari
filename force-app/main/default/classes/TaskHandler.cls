public class TaskHandler {
	@future(callout = true)
    public static void InsertLeadTask(ID leadownerId,string leadstatus,id leadwhoId,string leadtasksubject)
    {   system.debug('inside future class'+leadownerId+' -- '+leadstatus);
     	lead l =[select id,name from lead where contact__r.Id = : leadwhoId];
        list<task>  inserttask  = new list<task>();
        task ta = new task();
        ta.OwnerId=leadownerId;
        ta.Status=leadstatus;
     	ta.whoId=l.Id;
     	ta.subject=leadtasksubject;
        inserttask.add(ta);
        insert inserttask;
    }
}