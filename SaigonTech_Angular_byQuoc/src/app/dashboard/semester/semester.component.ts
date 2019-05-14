import { Component, OnInit, ViewChild } from '@angular/core';
import { Semester, SemesterService } from 'src/app/services/semester.service';
import { Title } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  semesters: Semester[] = [];
  semester: Semester = {} as Semester;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private semesterService: SemesterService) { }

  ngOnInit() {
    this.titleService.setTitle("Semester");
    this.loadData();
  }

  public loadData(){
    this.semesterService.getAllSemester().subscribe(result =>{
      console.log(result);
      this.semesters = result.data;
    });
  }

  ShowModalAdd(){
    this.semester = {} as Semester;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.semesterService.getSemesterId(id).subscribe(result =>{
      console.log(result);
      this.semester = result.data;
      this.modalEdit.show();
    });
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.semesterService.getSemesterId(id).subscribe(result =>{
      console.log(result);
      this.semester = result.data;
      this.modalDelete.show();
    });
  }

  add(){
    this.semesterService.add(this.semester).subscribe(result =>{
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
    this.semesterService.update(this.semester).subscribe(result =>{
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
    this.semesterService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteSemester = this.semesters.find(x => x.id === id);
        console.log(deleteSemester);
        if(deleteSemester){
          const index = this.semesters.indexOf(deleteSemester);
          this.semesters.splice(index, 1);
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
    this.semesterService.getSemesterId(id).subscribe(result =>{
      console.log(result);
      this.semester = result.data;
      this.modalDetail.show();
    });
  }

}
