({
	ContactList : function(cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'First name', fieldName: 'FirstName', type: 'text'},
            {label: 'Last name', fieldName: 'LastName', type: 'text'},
            {label: 'Contact Email', fieldName: 'Email', type: 'email'},
        ]);
        cmp.set("v.data", [{
                Id: "a0319000001GtsjAAC",
                firstname: "John Doe",
                lastname: "Active",
                email: "2005-01-01"
            },
            {
                Id: "a0319000001GtsjAAD",
                firstname: "Mary Doe",
                lastname: "Active",
                email: "2005-02-10"
            }
        ]);
        var selectedRowsIds = ["a0319000001GtsjAAC"];
        cmp = cmp.find("tabl");
    	cmp.set("v.selectedRows", selectedRowsIds);
		//helper.fetchData(cmp);
	},
    updateSelectedText: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        cmp.set('v.selectedRowsCount', selectedRows.length);
        console.log('Inside updateSelectedText --> '+JSON.stringify(selectedRows));
        var recId = cmp.get("v.recordId");
        var row = event.getParam('row');
        //var selectedRows = event.getParam('selectedRows');
		cmp.set('v.selectedRow',true);
        console.log('Inside updateSelectedText --> '+' - '+selectedRows);
        cmp.set('v.selectedRec', selectedRows);
		
    }
})