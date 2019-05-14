import { Component, OnInit, ViewChild } from '@angular/core';
import { Education, EducationService } from 'src/app/services/education.service';
import { YearService } from 'src/app/services/year.service';
import { Title } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educations: Education[] = [];
  education: Education = {} as Education;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private educationService: EducationService) { }

  ngOnInit() {
    this.titleService.setTitle("Education");
    this.loadData();
  }

  public loadData(){
    this.educationService.getAllEducation().subscribe(result =>{
      console.log(result);
      this.educations = result.data;
    });
  }

  ShowModalAdd(){
    this.education = {} as Education;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.educationService.getEducationId(id).subscribe(result =>{
      console.log(result);
      this.education = result.data;
      this.modalEdit.show();
    });
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.educationService.getEducationId(id).subscribe(result =>{
      console.log(result);
      this.education = result.data;
      this.modalDelete.show();
    });
  }

  add(){
    this.educationService.add(this.education).subscribe(result =>{
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
    this.educationService.update(this.education).subscribe(result =>{
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
    this.educationService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteEducation = this.educations.find(x => x.id === id);
        console.log(deleteEducation);
        if(deleteEducation){
          const index = this.educations.indexOf(deleteEducation);
          this.educations.splice(index, 1);
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

  ShowModalDetail(event = null, id){
    event.preventDefault();
    this.educationService.getEducationId(id).subscribe(result =>{
      console.log(result);
      this.education = result.data;
      this.modalDetail.show();
    });
  }
}
