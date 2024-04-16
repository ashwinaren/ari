---
title: AccountListController Class Documentations
---
<SwmSnippet path="/force-app/main/default/classes/AccountListController.cls" line="2">

---

This method used to get the 10 acccounts

```apex
    @AuraEnabled
    public static List < Account > fetchAccts() {
        return [ SELECT Id, Name, Industry, Type FROM Account LIMIT 10 ];
    }
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXJpJTNBJTNBYXNod2luYXJlbg==" repo-name="ari"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
