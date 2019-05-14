import { Component, OnInit, ViewChild } from '@angular/core';
import { ExSubject, ExamsubjectService } from '../../services/examsubject.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';
import { Major, MajorService } from '../../services/major.service';

@Component({
  selector: 'app-examsubject',
  templateUrl: './examsubject.component.html',
  styleUrls: ['./examsubject.component.css']
})
export class ExamsubjectComponent implements OnInit {

  //Exam Subject
  exsubjects: ExSubject[] = [];
  exsubject: ExSubject = {} as ExSubject;

  //Major
  majors: Major[] = [];
  major: Major = {} as Major;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  
  constructor(private titleService: Title, private exsubjectService: ExamsubjectService, private majorService: MajorService) { }

  ngOnInit() {
    this.titleService.setTitle("Exam Subject");
    this.loadData();
    this.dataMajor();
  }

  public loadData(){
    this.exsubjectService.getAllExSubject().subscribe(result =>{
      console.log(result);
      this.exsubjects = result.data;
    })
  }

  //data Major
  public dataMajor(){
    this.majorService.getAllMajor().subscribe(major =>{
      console.log(major);
      this.majors = major.data;
    })
  }

  ShowModalAdd(){
    this.exsubject = {} as ExSubject;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.exsubjectService.getExSubjectId(id).subscribe(result =>{
      console.log(result);
      this.exsubject = result.data;
      this.modalEdit.show();
    });
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.exsubjectService.getExSubjectId(id).subscribe(result =>{
      console.log(result);
      this.exsubject = result.data;
      this.modalDelete.show();
    });
  }

  add(){
    const param = {
      examName: this.exsubject.examName,
      majoR_ID: this.major.id
    }
    this.exsubjectService.add(param).subscribe(result =>{
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
    this.exsubjectService.update(this.exsubject).subscribe(result =>{
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.loadData();
        this.modalEdit.hide();
      }
    });
  }

  delete(id){
    this.exsubjectService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteExSubject = this.exsubjects.find(x => x.id === id);
        console.log(deleteExSubject);
        if(deleteExSubject){
          const index = this.exsubjects.indexOf(deleteExSubject);
          this.exsubjects.splice(index, 1);
        }
        this.modalDelete.hide();
      }
    });
  }

  close(){
    this.loadData();
    this.modalAdd.hide();
    this.modalDetail.hide();
    this.modalEdit.hide();
    this.modalDelete.hide();
  }

  ShowModalDetail(event = null, id){
    event.preventDefault();
    this.exsubjectService.getExSubjectId(id).subscribe(result =>{
      console.log(result);
      this.exsubject = result.data;
      this.modalDetail.show();
    });
  }
}
