public class chargingStationvalues {
	@AuraEnabled(cacheable=true)
    public static list<charging_station__c> cityCoordinates(string selectedCity){
        system.debug(' Inside apex -- '+selectedCity);
        list<charging_station__c> cs = [SELECT Name,Battery_Capacity__c,Compatible_Vehicle__c,Location__c,
                                        Location__Latitude__s,Location__Longitude__s,City__c,State__c,Country__c,Address__c FROM Charging_Station__c 
                                        where City__c =: selectedCity limit 10];
        if(cs.size()>0){
            system.debug(' Inside val -- '+cs[0]);
            return cs;
        }else{
            system.debug(' Inside Error -- ');
            return null;
        }
    }
    @AuraEnabled(cacheable=true)
    public static user userDetails(){
        user currentUser =[ select id,name,city,state,country from user where id=: UserInfo.getUserId()];
        system.debug(' Inside User method -- '+currentUser);
        return currentUser;
    }
}