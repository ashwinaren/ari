({
    handleSubmit : function(component, event, helper) {
        component.find('editform').submit();
    },
    
    handleSuccess : function(component, event, helper) {
        var strAccName = component.find("accName").get("v.value");
        component.find('notifLib').showToast({
            "variant": "success",
            "title": strAccName,
            "message": "Account Updated Successfully!!"
        });
        component.find("overlayLibDemo1").notifyClose();
    },
})