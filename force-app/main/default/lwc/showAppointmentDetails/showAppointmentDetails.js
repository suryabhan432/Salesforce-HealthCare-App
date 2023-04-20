import { LightningElement, api, track, wire } from 'lwc';
import findAppointments from '@salesforce/apex/FindAppointment.findAppointments';


export default class ShowAppointmentDetails extends LightningElement {
   @api orders = 'ASC';
   @track bulabel = 'Sorted by Date ASC';
    @track searchVal='';
    @track appoints = [];

    //@wire(findAppointments,{searchKey:'$searchVal',asDs:'$orders'}) appoints;


    // fetch input value
    inputHandler(event){
             this.searchVal = event.target.value;
             findAppointments({searchKey:this.searchVal}).then(result=>{
                this.appoints = result;
            })
             
    }

    connectedCallback(){
        findAppointments().then(result=>{
            this.appoints = result;
        })
    }


    sortAscDesc(orderValue){
        console.log(orderValue);
        if(orderValue){
            findAppointments({asDs:orderValue}).then(result=>{
                this.appoints = result;
            })
        }
    }

    // sorted button handle
    sortHandler(event){
        if(event.target.label=== 'Sorted by Date ASC'){
            this.orders = 'DESC';
            this.bulabel = 'Sorted by Date DESC';
            this.sortAscDesc(this.orders);
        }
        else if(event.target.label === 'Sorted by Date DESC'){
            this.orders = 'ASC';
            this.bulabel = 'Sorted by Date ASC';
            this.sortAscDesc(this.orders);
        }
        
    }
    

    

}