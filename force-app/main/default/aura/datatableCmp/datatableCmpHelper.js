({
    fetchData : function(cmp, event, helper) {
        var action = component.get("c.getContactList");
        action.setCallback(this, function(result){
            var state = result.getState();
            if (state === "SUCCESS"){
                cmp.set("v.data",result.getReturnValue());   
            }
        });
        $A.enqueueAction(action);
	}
});