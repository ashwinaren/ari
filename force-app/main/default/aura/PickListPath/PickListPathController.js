({
    handleSelect : function (component, event, helper) {
        var stepName = event.getParam("detail").value;
        component.set("v.PicklistField.Lead_Status__c", stepName);
        if(stepName == "Sales Accept"){
            /*var toastEvent = $A.get("e.force:showToast");
     		toastEvent.setParams({
       		"title": "Success!",
        	"message": "Please Change Lead Owner" + stepName
        	});
        toastEvent.fire();*/
        helper.showModalHelper(component, event, helper);
        /*var evt = $A.get(“e.c:leadOwnerEvt);
        evt.setParams({ “Pass_Result”: "{!v.recordId}"});
        evt.fire();*/
    	}
        component.find("record").saveRecord($A.getCallback(function(response) {
            alert('Inside refresh --> '+response);
            if (response.state === "SUCCESS") {
                alert('success refresh --> '+response.state);
                $A.get('e.force:refreshView').fire();
            }
        }));
    }
    
})