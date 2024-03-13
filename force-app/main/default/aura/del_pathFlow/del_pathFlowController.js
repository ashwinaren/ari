({
	handleSelect : function (component, event, helper) {
        var stepName = event.getParam("detail").value;
        component.set("v.PicklistField.StageName", stepName);
        if(stepName == "Closed Won"){
           alert('Closed Won');
        	var flow = component.find("flowData");
        	flow.startFlow("Hello");
           }
    },
})