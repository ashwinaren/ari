({
	handleSelectedRecord : function(component, event, helper) {
		var selectedContacts = [];
        var checkvalue = component.find("checkContact");
        if(!Array.isArray(checkvalue)){
            if (checkvalue.get("v.value") == true) {
                selectedContacts.push(checkvalue.get("v.text"));
            }
        }else{
            for (var i = 0; i < checkvalue.length; i++) {
                if (checkvalue[i].get("v.value") == true) {
                    selectedContacts.push(checkvalue[i].get("v.text"));
                }
            }
        }
        console.log('helper selected values-' + selectedContacts);
        var action = component.get("c.updateLead"); 
        //action.setParams({ lId : selectedContacts /*,status : 'Sales Accept'*/});
        action.setCallback(this, function(result){
            var state = result.getState();
            alert('Inside action');
            if (state === "SUCCESS"){
                alert('helper state --> '+ state);
                console.log('return values --> '+JSON.stringify(result.getReturnValue()));
                //component.set("v.contactList",result.getReturnValue());   
            }else{
                alert('state1 --> '+ state);
            }
        });
        $A.enqueueAction(action);
	}
})