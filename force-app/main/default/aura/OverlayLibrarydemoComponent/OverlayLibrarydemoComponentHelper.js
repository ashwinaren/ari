({
    showModalHelper : function(component, event, helper) {
        var strAccId = component.get("v.recordId");
        console.log('Account Id ====>'+strAccId);
        // $A.createComponent("c:AccountEditComponent",
        $A.createComponent("c:AccountEditComponent", 
                           {strRecordId : strAccId},
                           function(result, status) {
                               if (status === "SUCCESS") {
                                alert('Status--> '+status);
                                   component.find('overlayLibDemo').showCustomModal({
                                       header: "Account Edit Form",
                                       body: result, 
                                       showCloseButton: true,
                                       cssClass: "mymodal", 
                                   })
                               }                               
                           });
    }
})