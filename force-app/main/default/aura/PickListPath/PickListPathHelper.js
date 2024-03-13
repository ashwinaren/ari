({
    showModalHelper : function(component, event, helper) {
        var strAccId = component.get("v.recordId");
        console.log('Account Id ====>'+strAccId);
        $A.createComponent("c:LeadOwner", 
                           {strRecordId : strAccId},
                           function(result, status) {
                               alert('Status--> '+status);
                               if (status === "SUCCESS") {
                                   component.find('overlayLibDemo').showCustomModal({
                                       header: "Lead Edit Form",
                                       body: result, 
                                       showCloseButton: true,
                                       cssClass: "mymodal", 
                                   })
                               }                               
                           });
    }
})