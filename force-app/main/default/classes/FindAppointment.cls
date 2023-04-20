public with sharing class FindAppointment {
    @AuraEnabled
    public static list<Appointment__c> findAppointments(String searchKey,String asDs) {
        if(searchKey!=null && asDs==null ){
            String key='%'+searchKey+'%';
            return [select Id,Patient__r.Name,Patient__r.Age__c,Appointment_Date__c,Location__c from Appointment__c where Location__c like :key];
        
        }

        else if(asDs!=null && searchKey==null){
            String sortQu = 'select Id,Patient__r.Name,Patient__r.Age__c,Appointment_Date__c,Location__c from Appointment__c order by Appointment_Date__c '+asDs;
            return database.query(sortQu);
        }

        else{
            return [select Id,Patient__r.Name,Patient__r.Age__c,Appointment_Date__c,Location__c from Appointment__c ];
        }
        
        

    }
}