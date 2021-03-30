import { LightningElement, api } from 'lwc';

export default class Pagination extends LightningElement {
    totalRecords
    recordSize = 3
    currentPage = 1
    totalPage = 0

    get records(){
        return this.visibleRecords
    }

    @api 
    set records(data){
        if(data){
            this.totalRecords = data
            this.totalPage = Math.ceil(data.length/this.recordSize)
            this.updateRecords()
        }
    }

    get disablePrevious(){
        return this.currentPage<=1
    }
    get disableNext(){
        return this.currentPage>=this.totalPage
    }
    previousHandler(){
        if(this.currentPage > 1){
            this.currentPage = this.currentPage-1
            this.updateRecords()
        }

    }
    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage+1
            this.updateRecords()
        }

    }
    updateRecords(){
        const start = (this.currentPage-1)*this.recordSize
        const end = this.recordSize*this.currentPage
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('update',{
            detail:{
                records:this.visibleRecords
            }
        }))
    }

    updateContactHandler(event){
        console.log(event.detail.records)
    }
}

//24:00