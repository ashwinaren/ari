public with sharing class newsController {
	@AuraEnabled
    public static Map<String,Object> retrieveNews() {
        HttpRequest httpRequest = new HttpRequest();
        //httpRequest.setEndpoint('https://newsapi.org/v2/everything?q=tesla&from=2022-03-11&sortBy=publishedAt&apiKey=8972450970b24834af80e8b74291c083');
        httpRequest.setEndpoint('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8972450970b24834af80e8b74291c083');
        httpRequest.setMethod('GET');
        
        Map<String,Object> newsJsonData = new Map<String,Object>();
        String strResponse =null;

        try{
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode()==200){
                strResponse = httpResponse.getBody();
            }else{
                throw new CalloutException(httpResponse.getBody());
            }
        }
        catch(Exception ex){
            throw ex;
        }

        if(!String.isBlank(strResponse)){
            newsJsonData = (Map<String,Object>)JSON.deserializeUntyped(strResponse);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        }else{
            return null;
        }
    }
}