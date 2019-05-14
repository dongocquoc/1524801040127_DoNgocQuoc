import { Component, OnInit, ViewChild } from '@angular/core';
import { StageDetails, StagedetailService } from '../../services/stagedetail.service';
import { Stage, StageService } from '../../services/stage.service';
import { Major, MajorService } from '../../services/major.service';
import { ExSubject, ExamsubjectService } from '../../services/examsubject.service';
import { Candidates, CandidateService } from '../../services/candidate.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stagedetail',
  templateUrl: './stagedetail.component.html',
  styleUrls: ['./stagedetail.component.css']
})
export class StagedetailComponent implements OnInit {

  stagedetails: StageDetails[] = [];
  stagedetail: StageDetails = {} as StageDetails;

  stages: Stage[] = [];
  stage: Stage = {} as Stage;

  candidates: Candidates[] = [];
  candidate: Candidates = {} as Candidates;

  majors: Major[] = [];
  major: Major = {} as Major;

  subjects: ExSubject[] = [];
  subject: ExSubject = {} as ExSubject;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private stageService: StageService, private candidateService: CandidateService, private majorService: MajorService, private subjectService: ExamsubjectService, private stagedetailService: StagedetailService) { }

  ngOnInit() {
    this.titleService.setTitle("Assign Candidate To Stage");
    const parameters = new URLSearchParams(window.location.search);
    this.stage.id = Number(parameters.get('id'));
    //this.loadData();
    this.dataStageDetailByStageId();
    this.dataStage();
  }

  public loadData() {
    this.stagedetailService.getAllStageDetail().subscribe(result => {
      console.log(result);
      this.stagedetails = result.data;
    });
  }

  public dataStageDetailByStageId() {
    this.stagedetailService.getStageDetailByStageId(this.stage.id).subscribe(result => {
      console.log(result);
      this.stagedetails = result.data;
    })
  }

  public dataStageDetailById(id) {
    this.stagedetailService.getStageDetailId(id).subscribe(result => {
      console.log(result);
      this.stagedetail = result.data;
    })
  }

  //load data stage
  public dataStage() {
    this.stageService.getAllStage().subscribe(result => {
      console.log(result);
      this.stages = result.data;
    })
  }

  //load data candidate
  public dataCandidate() {
    this.candidateService.getAllCandidate().subscribe(result => {
      console.log(result);
      this.candidates = result.data;
    })
  }

  //load data major
  public dataMajor() {
    this.majorService.getAllMajor().subscribe(result => {
      console.log(result);
      this.majors = result.data;
    })
  }

  //load data subject
  public dataSubject() {
    this.subjectService.getAllExSubject().subscribe(result => {
      console.log(result);
      this.subjects = result.data;
    })
  }
/////////////////////////////////////////
  public dataSubjectByMajor(){
    this.subjectService.getExSubjectByMajor(this.stagedetail.major_ID).subscribe(sub =>{
      console.log(sub);
      this.subjects = sub.data;
    })
  }

  public dataSubjectByMajorAdd(){
    this.subjectService.getExSubjectByMajor(this.major.id).subscribe(sub =>{
      console.log(sub);
      this.subjects = sub.data;
    })
  }

  // show modal stage detail
  ShowModalAdd() {
    this.stagedetail = {} as StageDetails;
    this.major = {} as Major;
    this.subject = {} as ExSubject;
    this.message = "";
    this.dataStage();
    this.dataMajor();
    //this.dataSubject();
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id) {
    event.preventDefault();
    this.message = "";
    this.dataMajor();
    this.dataSubject();
    this.dataStage();
    this.stagedetailService.getStageDetailId(id).subscribe(result => {
      console.log(result);
      this.stagedetail = result.data;
      this.modalEdit.show();
    })
  }

  ShowModalDelete(event = null, id) {
    event.preventDefault();
    this.dataMajor();
    this.dataSubject();
    this.stagedetailService.getStageDetailId(id).subscribe(result => {
      console.log(result);
      this.stagedetail = result.data;
      this.modalDelete.show();
    })
  }

  ShowModalDetail(event = null, id) {
    event.preventDefault();
    this.dataStage();
    this.dataMajor();
    this.dataSubject();
    this.dataStage();
    this.stagedetailService.getStageDetailId(id).subscribe(result => {
      console.log(result);
      this.stagedetail = result.data;
      this.modalDetail.show();
    })
  }

  //event change combobox
  public changeStage() {
    this.dataStageDetailByStageId();
  }
/////////////////////////////////////////
  public changeMajor(){
    alert('1')
    console.log(this.stagedetail.major_ID);
    this.dataSubjectByMajor();
  }

  public changeMajorAdd(){
    alert('1')
    console.log(this.major.id);
    this.dataSubjectByMajorAdd();
  }

  // event lose
  close() {
    this.modalAdd.hide();
    this.modalDetail.hide();
    this.modalEdit.hide();
    this.modalDelete.hide();
  }
  addrow(event = null) {
    alert(this.stagedetail.exam_ID);
    event.preventDefault();
    var row = document.getElementById('rowid');
    row.innerHTML += `
    <tr _ngcontent-c2="" class="form-group">
      <th _ngcontent-c2="" scope="row">1</th>
      <td _ngcontent-c2="">
        <select [(ngModel)]="stagedetail.exam_ID" name="inputSubject" id="inputSubject" class="form-control">
         <option *ngFor="let subject of subjects" [value]="subject.id" selected>{{subject.examName}}</option>
        </select>
      </td>
      <td _ngcontent-c2="">
        <div _ngcontent-c2="" class="form-group">
          <div _ngcontent-c2="" class="input-group mb-2">
            <input _ngcontent-c2="" class="form-control" id="inputScore" placeholder="Enter begin score" type="text">
            <div _ngcontent-c2="" class="input-group-prepend">
              <div _ngcontent-c2="" class="input-group-text">
              <a _ngcontent-c2="" (click)="addrow($event)" href="#"><i _ngcontent-c2="" class="mdi mdi-plus"></i></a>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    `
  }

  addstagedetail(event = null){
    event.preventDefault();
    alert(this.stagedetail.major_ID);
    alert(this.stagedetail.stage_ID);
    const param = {
      stage_ID: this.stagedetail.stage_ID,
      starTime: this.stagedetail.starTime,
      endTime: this.stagedetail.endTime,
      interview: this.stagedetail.interview,
      major_ID: this.stagedetail.major_ID,
      exam_ID: this.stagedetail.exam_ID
    }
    this.stagedetailService.add(param).subscribe(result =>{
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataStageDetailByStageId();
        this.modalAdd.hide();
      }
    });
  }

  add(){
    const param = {
      starTime: this.stagedetail.starTime,
      endTime: this.stagedetail.endTime,
      interview: this.stagedetail.interview,
      major_ID: this.major.id,
      stage_ID: this.stage.id,
      exam_ID: this.subject.id
    };
    this.stagedetailService.add(param).subscribe(result =>{
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataStageDetailByStageId();
        this.modalAdd.hide();
      }
    });
  }

  update(idd) {
    const param = {
      "id": idd,
      "starTime": this.stagedetail.starTime,
      "endTime": this.stagedetail.endTime,
      "interview": this.stagedetail.interview,
      "major_ID": Number(this.stagedetail.major_ID),
      "stage_ID": Number(this.stagedetail.stage_ID),
      "exam_ID": Number((<HTMLInputElement>document.getElementById('inputSubject')).value)
    } as any;
    console.log((<HTMLInputElement>document.getElementById('inputSubject')).value)
    console.log(param);
    this.stagedetailService.update(param).subscribe(result => {
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataStageDetailByStageId();
        this.modalEdit.hide();
      }
    });
  }

  delete(id) {
    this.stagedetailService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteStageDetail = this.stagedetails.find(x => x.id === id);
        console.log(deleteStageDetail);
        if (deleteStageDetail) {
          const index = this.stagedetails.indexOf(deleteStageDetail);
          this.stagedetails.splice(index, 1);
        }
        this.modalDelete.hide();
      }
    });
  }

}
