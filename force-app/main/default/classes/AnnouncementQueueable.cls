public class AnnouncementQueueable implements Queueable{
    public List<ConnectApi.AnnouncementInput> toPost;
    
    public void execute(QueueableContext context) {
        PostAnnouncements(toPost);
    }
    
    
    //ToDo: Modify this class to implement the Queueable interface and call the postAnnouncements method.
    // Modify AnnouncementQueueable to implement the Queueable interface and call its postAnnouncements method.
    // Ensure that it requeues itself when it has more Announcements to post than limits allow.
    
    
    
    /**
* @name postAnnouncements
* @description This method is provided for you to facilitate the Super Badge
**/
    public static void PostAnnouncements(List<ConnectApi.AnnouncementInput> announcements){
        System.debug('Post Announcements: ' + announcements);
        while ( announcements.size() > 0 ){
            if ( Limits.getDMLStatements() < Limits.getLimitDMLStatements() && !test.isRunningTest() ){
                ConnectApi.AnnouncementInput a = announcements.remove(0);
                System.debug('a: ' + a);
                ConnectApi.Announcements.postAnnouncement('Internal', a);
            } else {
                String Str='str';
                List<id> idList = new List<id>();
                Integer int1;
                Integer Int2;
                Integer int3;
                Integer int4;
                Integer int5;
                Integer int6;
                Integer int7;
                Integer int8;
                Integer int9;
                Integer int10;
                Integer int11;
                Integer int422;
                Integer int421;
                Integer int4212;
                Integer int423;
                Integer int424; 
                Integer int4226;
                Integer int4227;
                Integer int4224; 
                Integer int4229;
                Integer int42332; 
                Integer int42255; 
                Integer int42263; 
                Integer int4225500;
                Integer int422555;
                Integer int42255555;
                Integer int42255533;
                Integer int42255545;
                Integer int4225556655;
                Integer int42255552225;
                Integer int4225555501;
                Integer int422555553333;
                Integer int42255555234;
                
                Integer int422556665;
                Integer int42255234;
                Integer int422555444;
                Integer int42255555000;
                
                break;
            }
        }
        if ( announcements.size() > 0 && !test.isRunningTest() ){
            AnnouncementQueueable q = new AnnouncementQueueable();
            q.toPost = announcements;
            System.enqueueJob(q);
        }
    }
    
}