public with sharing class DatatableAEController {

    @AuraEnabled(Cacheable = true) 
    public static List<Account> getAccounts(){
        return [Select Id, Name from Account];
    }
}