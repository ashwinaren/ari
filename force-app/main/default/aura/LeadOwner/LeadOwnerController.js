({
    handleKeyUp: function (cmp, evt) {
        var isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            var queryTerm = cmp.find('enter-search').get('v.value');
            alert('Searched for "' + queryTerm + '"!');
        }
    },
    //get Contact List from apex controller
    doInit : function(component, event, helper) {
        var action = component.get("c.getLeadList");
        var strAccId = component.get("v.strRecordId");
        console.log('Acc Id --> '+strAccId);
        action.setParams({ leaId : strAccId });
        action.setCallback(this, function(result){
            var state = result.getState();
            if (state === "SUCCESS"){
                console.log('return values --> '+result.getReturnValue()+' '+JSON.stringify(result.getReturnValue()));
                component.set("v.contactList",result.getReturnValue());   
            }
        });
        $A.enqueueAction(action);
    },
     
    //Process the selected contacts
    handleSelectedContacts: function(component, event, helper) {
        helper.handleSelectedRecord(component, event, helper);
    }
})