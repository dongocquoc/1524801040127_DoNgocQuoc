import { Component, OnInit, ViewChild } from '@angular/core';
import { YearService, Year } from '../../services/year.service';
import { Title } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  years: Year[] = [];
  year: Year = {} as Year;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private yearService: YearService) { }

  ngOnInit() {
    this.titleService.setTitle("Year");
    this.loadData();
  }

  public loadData() {
    this.yearService.getAllYear().subscribe(result => {
      console.log(result);
      this.years = result.data;
    });
  }

  ShowModalAdd() {
    this.year = {} as Year;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.yearService.getYearId(id).subscribe(result =>{
      console.log(result);
      this.year = result.data;
      this.modalEdit.show();
    })
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.yearService.getYearId(id).subscribe(result =>{
      console.log(result);
      this.year = result.data;
      this.modalDelete.show();
    })
  }

  add() {
    this.yearService.add(this.year).subscribe(result => {
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.loadData();
        this.modalAdd.hide();
      }
    });
  }

  update(id){
    this.yearService.update(this.year).subscribe(result =>{
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.loadData();
        this.modalEdit.hide();
      }
    })
  }

  delete(id){
    this.yearService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteYear = this.years.find(x => x.id === id);
        console.log(deleteYear);
        if(deleteYear){
          const index = this.years.indexOf(deleteYear);
          this.years.splice(index, 1);
        }
        this.modalDelete.hide();
      }
    })
  }

  close(){
    this.loadData();
    this.modalAdd.hide();
    this.modalDetail.hide();
    this.modalEdit.hide();
    this.modalDelete.hide();
  }
  ShowModalDetail(event = null, id) {
    event.preventDefault();
    this.yearService.getYearId(id).subscribe(result => {
      console.log(result);
      this.year = result.data;
      this.modalDetail.show();
    });
  }
}
