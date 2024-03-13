({
    /*init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Contact name', fieldName: 'opportunityName', type: 'text'},
            {label: 'Account name', fieldName: 'accountName', type: 'text'},
            {label: 'Email', fieldName: 'Email', type: 'email'},
            {label: 'Phone', fieldName: 'Phone', type: 'phone'}
        ]);
        helper.fetchData(cmp, event, helper);
    },*/
    
    updateSelectedText: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        cmp.set('v.selectedRowsCount', selectedRows.length);
    },
    fetchAccounts : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Account Name', fieldName: 'Name', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Type', fieldName: 'Type', type: 'Text'}
        ]);
        var action = component.get("c.fetchAccts");
        action.setParams({});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.acctList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
});