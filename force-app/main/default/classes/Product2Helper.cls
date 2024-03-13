public class Product2Helper {
//TODO: After reviewing the existing code in the product2Helper class, you realize that it too can benefit from your constants class.
// Modify Product2Helper to use the INVENTORY_ANNOUNCEMENTS constant instead of "group name" to ensure consistency in the app.
/**
 * @name COLLABORATION_GROUP
 * @description List of CollaborationGroup used in both business and test logic
**/
static List<CollaborationGroup> COLLABORATION_GROUP = [
    SELECT Id
    FROM CollaborationGroup
    WHERE Name = :Constants.INVENTORY_ANNOUNCEMENTS
    OR Name = :('TEST'+Constants.INVENTORY_ANNOUNCEMENTS)
    LIMIT 1
];

/**
 * @name afterUpdate
 * @description called by product2 Trigger on After Update
 * @param List<Product2> newList
 * @param List<Product2> oldList
**/
public static void AfterUpdate(List<Product2> newList){
    //TODO: Next, complete the AfterUpdate method so that it uses the PostAlerts method when you determine
    // that a Product’s Quantity_Remaining__c field has dropped below the threshold value captured in the custom metadata records you created previously.

    //ToDo: Declare a List of Product2 records named needsAnnouncement

    //ToDo: Declare a Map of Strings to Inventory_Setting__mdt records

    //ToDo: Loop through a query of Inventory_Setting__mdt records and populate the Map with Name as the key

    //ToDo: Loop through the Products in newList
    // Use the corresponding Inventory Setting record to determine the correct Low Quantity Alert
    // If the Product's Quantity Remaining has been changed to less than the Low Quantity Alert
    //      add it to the needsAnnouncement list

    //ToDo: Pass records to the postAlerts method


    //  You know that a low inventory value should prompt an announcement to be posted to the Inventory Announcements Chatter group, so an Apex trigger must be used.
    //  After reviewing the legacy code, you realize the previous programmer attempted to write this business logic in the Product2Trigger, but that logic is faulty.

    List<Product2> needsAnnouncement = new List<Product2>();
    Map<String, Inventory_Setting__mdt> stringToInventorySettingMap = new Map<String, Inventory_Setting__mdt>();
    for (Inventory_Setting__mdt setting : [SELECT DeveloperName,  Id,  Label,  Language,  Low_Quantity_Alert__c,  MasterLabel,  NamespacePrefix,  QualifiedApiName FROM Inventory_Setting__mdt]) {
        stringToInventorySettingMap.put(setting.DeveloperName, setting);
    }
    System.debug('here');
    for ( Product2 p : newList ) {
        System.debug('there');
        if (stringToInventorySettingMap.containsKey(p.Family) && (p.Quantity_Remaining__c < stringToInventorySettingMap.get(p.Family).Low_Quantity_Alert__c)) {
            needsAnnouncement.add(p);
            System.debug('everywhere');
        }
    }
    PostAlerts(needsAnnouncement);
}

/**
 * @name postAlerts
 * @description called by product2 Trigger on After Update
 * @param List<Product2> productList
**/
//TODO: Complete the PostAlerts method in Product2Helper to construct new AnnouncementInputs for the
// Chatter Group and for use with the AnnouncementQueuable Apex class.
public static void PostAlerts(List<Product2> productList){
    System.debug('PostAlerts');
    List<ConnectApi.AnnouncementInput> toPost = new List<ConnectApi.AnnouncementInput>();
    for ( Product2 p : productList ){
        System.debug('loop');
        ConnectApi.TextSegmentInput textSegmentInput = new ConnectApi.TextSegmentInput();
        ConnectApi.MessageBodyInput messageBodyInput = new ConnectApi.MessageBodyInput();
        ConnectApi.AnnouncementInput ann = new ConnectApi.AnnouncementInput();

        // ToDo: Construct a new AnnouncementInput for the Chatter Group so that it
        //  expires in a day
        //  does not notify users via email.
        //  and has a text body that includes the name of the product followed by the INVENTORY_LEVEL_LOW constant
        ann.sendEmails = false;
        ann.expirationDate = Date.today().addDays(1);
        ann.parentId = '0F95g000000koPECAY';

        textSegmentInput.text= p.Name + ' ' + Constants.INVENTORY_LEVEL_LOW;

        messageBodyInput.messageSegments = new List<ConnectApi.TextSegmentInput>();
        messageBodyInput.messageSegments.add(textSegmentInput);

        ann.body = messageBodyInput;
        toPost.add(ann);
    }
    // ToDo: Create and enqueue an instance of the announcementQueuable class with the list of Products
    System.debug('toPost: ' + toPost);
    AnnouncementQueueable q = new AnnouncementQueueable();
    q.toPost = toPost;
    System.enqueueJob(q);
}

}