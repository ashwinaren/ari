({
    handleSelect : function (component, event, helper) {
        var stepName = event.getParam("detail").value;
        component.set("v.PicklistField.Lead_Status__c", stepName);
        if(stepName == "Sales Accept"){
            var toastEvent = $A.get("e.force:showToast");
     		toastEvent.setParams({
       		"title": "Success!",
        	"message": "Please Change Lead Owner ==> " + stepName
        	});
        toastEvent.fire();
        helper.showModalHelper1(component, event, helper);
    	}
        component.find("record").saveRecord($A.getCallback(function(response) {
            if (response.state === "SUCCESS") {
                $A.get('e.force:refreshView').fire();
            }
        }));
    }
})