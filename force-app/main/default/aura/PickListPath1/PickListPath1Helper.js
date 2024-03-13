({
    showModalHelper1 : function(component, event, helper) {
        var strLeadId = component.get("v.recordId");
        console.log('Account Id ====>'+strAccId);
        $A.createComponent("c:LeadOwner1", 
                           {strRecordId : strLeadId},
                           function(result, status) {
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