import { Component, OnInit, ViewChild } from '@angular/core';
import { Major, MajorService } from 'src/app/services/major.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent implements OnInit {

  majors: Major[] = [];
  major: Major = {} as Major;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  
  constructor(private titleService: Title, private majorService: MajorService) { }

  ngOnInit() {
    this.titleService.setTitle("Major");
    this.loadData();
  }

  public loadData() {
    this.majorService.getAllMajor().subscribe(result => {
      console.log(result);
      this.majors = result.data;
    });
  }

  ShowModalAdd(){
    this.major = {} as Major;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.majorService.getMajorId(id).subscribe(result =>{
      console.log(result);
      this.major = result.data;
      this.modalEdit.show();
    })
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.majorService.getMajorId(id).subscribe(result =>{
      console.log(result);
      this.major = result.data;
      this.modalDelete.show();
    })
  }

  add() {
    this.majorService.add(this.major).subscribe(result => {
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
    this.majorService.update(this.major).subscribe(result =>{
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
    this.majorService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteMajor = this.majors.find(x => x.id === id);
        console.log(deleteMajor);
        if(deleteMajor){
          const index = this.majors.indexOf(deleteMajor);
          this.majors.splice(index, 1);
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
    this.majorService.getMajorId(id).subscribe(result => {
      console.log(result);
      this.major = result.data;
      this.modalDetail.show();
    });
  }
}
