({
    doInit : function(component, event, helper) {
        // call apex method to fetch list view dynamically
        var action = component.get("c.listValues");
        action.setParams({
            "objectInfo" : component.get("v.objectInfo")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var listViewResult = response.getReturnValue();
                alert('size --> '+JSON.stringify(listViewResult)+' == '+listViewResult[0].developerName)
                if(listViewResult.length > 0){
                    // set listViewResult attribute with response
                    component.set("v.listViewResult",listViewResult);
                    // set first value as default value
                    component.set("v.currentListViewName", listViewResult[0].developerName);
                    // rendere list view on component
                    component.set("v.bShowListView", true);    
                }            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
        var tablecomp = component.find('WrapperTable');
        var opts = [
            { value: "Red", label: "Red" },
            { value: "Green", label: "Green" },
            { value: "Blue", label: "Blue" }
        ];
        component.set("v.options", opts);
    },
    
    onPicklistChange: function(component, event, helper) {
        // unrenders listView
        component.set("v.bShowListView", false);
        alert('selected value --> '+event.getParam("detail").value);        
        // get current selected listview Name
        var lstViewName = event.getSource().get("v.value");
        
        // set new listName for listView
        component.set("v.currentListViewName", lstViewName);
        
        // rendere list view again with new listNew  
        component.set("v.bShowListView", true);
    },
    doSomething: function(component, event, helper) {
        var tablecomp = component.find('myl');
        var selectedRows = tablecomp.getSelectedRows();
        console.log(' --> '+tablecomp.getSelectedRows())
        //alert('Inside something --> '+component.find("mySelect").get("v.value")+' -- '+selectedRows);
        //console.log('selectedRows --> '+selectedRows+' - '+json.stingify(selectedRows));
    },
    loadOptions: function (component, event, helper) {
        var opts = [
            { value: "Red", label: "Red" },
            { value: "Green", label: "Green" },
            { value: "Blue", label: "Blue" }
        ];
        component.set("v.options", opts);
    }
})