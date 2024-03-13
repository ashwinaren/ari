public class EventHandler {
    public static void HandleEventInsert(ID leadownerId,id leadwhoId,string leadtasksubject,datetime leadstartdate ,datetime leadenddate)
    {   system.debug('inside future class'+leadtasksubject+' -- '+leadstartdate);
     	/*lead l =[select id,name from lead where contact__r.Id = : leadwhoId];
        list<event>  insertevent  = new list<event>();
        event ev = new event();
        ev.OwnerId=leadownerId;
        //ev.Status=leadstatus;
     	ev.whoId=l.Id;
     	ev.subject=leadtasksubject;
        ev.StartDateTime=leadstartdate;
        ev.EndDateTime=leadenddate;
        insertevent.add(ev);
        insert insertevent;*/
     
     	AsyncEventInsert.HandleEventInsert(leadownerId,leadwhoId,leadtasksubject,leadstartdate,leadenddate);
        
    }
}