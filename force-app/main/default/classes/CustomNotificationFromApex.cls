public without sharing class CustomNotificationFromApex {
    
    public static void notifyUsers(Set<String> recipientsIds, String TargetPageRef) {
        
        // Get the Id for our custom notification type
        CustomNotificationType notificationType = 
            [SELECT Id, DeveloperName 
             FROM CustomNotificationType 
             WHERE DeveloperName='Del_Custom_Notifi'];
        
        // Create a new custom notification
        Messaging.CustomNotification notification = new Messaging.CustomNotification();
        
        // Set the contents for the notification
        notification.setTitle('Apex Custom Notification');
        notification.setBody('The notifications are coming from INSIDE the Apex!');
        
        // Set the notification type and target
        notification.setNotificationTypeId(notificationType.Id);
        //notification.setTargetId(targetId);
        //PageReference pageRef = new PageReference('http://www.google.com');
        PageReference pageRef = ApexPages.currentPage();
        system.debug(' page --> '+pageRef);
        notification.setTargetPageRef('http://www.google.com');
        
        // Actually send the notification
        try {
            notification.send(recipientsIds);
        }
        catch (Exception e) {
            System.debug('Problem sending notification: ' + e.getMessage());
        }
    }
}