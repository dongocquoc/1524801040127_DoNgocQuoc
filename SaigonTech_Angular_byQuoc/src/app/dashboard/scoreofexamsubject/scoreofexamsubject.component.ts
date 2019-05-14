import { Component, OnInit, ViewChild } from '@angular/core';
import { ScoreExam, ScoreexamService } from 'src/app/services/scoreexam.service';
import { Major, MajorService } from 'src/app/services/major.service';
import { ExSubject, ExamsubjectService } from 'src/app/services/examsubject.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-scoreofexamsubject',
  templateUrl: './scoreofexamsubject.component.html',
  styleUrls: ['./scoreofexamsubject.component.css']
})
export class ScoreofexamsubjectComponent implements OnInit {

  scoreexams: ScoreExam[] = [];
  scoreexam: ScoreExam = {} as ScoreExam;

  majors: Major[] = [];
  major: Major = {} as Major;

  examsubjects: ExSubject[] = [];
  examsubject: ExSubject = {} as ExSubject;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private majorSevice: MajorService, private exsubjectService: ExamsubjectService, private scoreexamService: ScoreexamService) { }

  ngOnInit() {
    this.titleService.setTitle("Passing Score Subject");
    this.loadData();
    this.dataMajor();
    // this.dataExamSubject();
  }

  //load data score exam
  public loadData() {
    this.scoreexamService.getAllScoreExam().subscribe(result => {
      console.log(result);
      this.scoreexams = result.data;
    });
  }

  public dataScoreExamById(id) {
    this.scoreexamService.getScoreExamId(id).subscribe(result => {
      console.log(result);
      this.scoreexam = result.data;
      alert(this.scoreexam.majoR_ID);
      alert(this.scoreexam.exaM_ID);
    });
  }

  //load data major
  public dataMajor() {
    this.majorSevice.getAllMajor().subscribe(result => {
      console.log(result);
      this.majors = result.data;
    });
  }

  //load data exam subject
  public dataExamSubject() {
    this.exsubjectService.getAllExSubject().subscribe(result => {
      console.log(result);
      this.examsubjects = result.data;
    });
  }

  public dataSubjectByMajor() {
    this.exsubjectService.getExSubjectByMajor(this.major.id).subscribe(sub => {
      console.log(sub);
      this.examsubjects = sub.data;
    })
  }

  public dataSubjectByMajorEdit() {
    this.exsubjectService.getExSubjectByMajor(this.scoreexam.majoR_ID).subscribe(sub => {
      console.log(sub);
      this.examsubjects = sub.data;
    })
  }

  // show modal Score Exam
  ShowModalAdd() {
    this.scoreexam = {} as ScoreExam;
    this.major = {} as Major;
    this.examsubject = {} as ExSubject;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id) {
    event.preventDefault();
    this.message = "";
    this.dataScoreExamById(id);
    //this.dataSubjectByMajorEdit();
    this.dataExamSubject();
    this.modalEdit.show();
  }

  ShowModalDelete(event = null, id) {
    event.preventDefault();
    this.dataScoreExamById(id);
    this.dataExamSubject();
    this.modalDelete.show();
  }

  ShowModalDetail(event = null, id) {
    event.preventDefault();
    this.dataScoreExamById(id);
    this.dataExamSubject();
    this.modalDetail.show();
  }

  // event Score Exam
  add() {
    const param = {
      sumScore: this.scoreexam.sumScore,
      scorePass: this.scoreexam.scorePass,
      exaM_ID: this.examsubject.id,
      majoR_ID: this.major.id
    }
    this.scoreexamService.add(param).subscribe(result => {
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

  update(idd) {
    const param = {
      id: idd,
      sumScore: this.scoreexam.sumScore,
      scorePass: this.scoreexam.scorePass,
      exaM_ID: Number((<HTMLInputElement>document.getElementById('inputExamSubject')).value),
      majoR_ID: Number(this.scoreexam.majoR_ID)
    }
    this.scoreexamService.update(param).subscribe(result => {
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.loadData();
        this.modalEdit.hide();
      }
    });
  }

  delete(id) {
    this.scoreexamService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteScoreExam = this.scoreexams.find(x => x.id === id);
        console.log(deleteScoreExam);
        if (deleteScoreExam) {
          const index = this.scoreexams.indexOf(deleteScoreExam);
          this.scoreexams.splice(index, 1);
        }
        this.modalDelete.hide();
      }
    });
  }

  // event lose
  close() {
    this.loadData();
    this.modalAdd.hide();
    this.modalDetail.hide();
    this.modalEdit.hide();
    this.modalDelete.hide();
  }

  //event change combobox
  public changeMajor() {
    this.dataSubjectByMajor();
  }

  public changeMajorEdit(){
    this.dataSubjectByMajorEdit();
  }

}
