({
	fetchData : function (cmp) {
		var action = cmp.get("c.getContact");
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            
            if (state === "SUCCESS"){
                cmp.set("v.data", response.getReturnValue());
            }
            else if (state === "ERROR"){
                console.log(response.getError());
            }
            else{
                console.log(response);
            }
        });
        
        $A.enqueueAction(action);
	}
})