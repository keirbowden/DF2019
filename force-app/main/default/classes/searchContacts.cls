public with sharing class searchContacts 
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> SearchContacts(String searchStr) 
    {
        List<Contact> contacts=new List<Contact>();
        if (''!=searchStr)
        {
            String wcName='%' + searchStr + '%';
            contacts=[SELECT Id, Name, Title, Email FROM Contact WHERE Name like :wcName LIMIT 10];
        }

        return contacts;
    }
}