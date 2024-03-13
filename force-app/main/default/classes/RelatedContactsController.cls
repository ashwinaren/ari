public class RelatedContactsController {
		@AuraEnabled
    public static list<Contact> getRelatedList(Id recordId)
    {
        List<Contact> Conlist = [Select id, name,firstname,lastname from Contact where AccountId=: recordId ];
        return Conlist;
    }
}