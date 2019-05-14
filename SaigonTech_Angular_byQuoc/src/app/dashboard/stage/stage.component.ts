import { Component, OnInit, ViewChild } from '@angular/core';
import { Stage, Semester, Year, StageService } from '../../services/stage.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';
import { SemesterService } from '../../services/semester.service';
import { YearService } from '../../services/year.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  stages: Stage[] = [];
  stage: Stage = {} as Stage;

  semesters: Semester[] = [];
  semester: Semester = {} as Semester;

  years: Year[] = [];
  year: Year = {} as Year;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private stageService: StageService, private semesterService: SemesterService, private yearService: YearService) { }

  ngOnInit() {
    this.titleService.setTitle("Stage");
    this.loadData();
  }

  // load data stage
  public loadData() {
    this.stageService.getAllStage().subscribe(result => {
      // cho nay lay dc cai id 
      console.log(result);
      this.stages = result.data;
    });
  }

  public dataStageById() {
    this.stageService.getStageId(this.stage).subscribe(result => {
      console.log(result);
      this.stage = result.data;
    });
  }

  public dataStageBySem() {
    this.stageService.GetStageBySemester(this.semester.id).subscribe(result => {
      console.log(result);
      this.stages = result.data;
    });
  }
  // load data semester
  public dataSemester() {
    this.semesterService.getAllSemester().subscribe(result => {
      console.log(result);
      this.semesters = result.data;
    })
  }

  public dataSemesterByID(id){
    this.semesterService.getSemesterId(id).subscribe(result => {
      console.log(result);
      this.semester = result.data;
    })
  }

  // load data year
  public dataYear() {
    this.yearService.getAllYear().subscribe(result => {
      console.log(result);
      this.years = result.data;
      this.year.id = result.data[0].id;
    })
  }

  public dataYearByID(id){
    this.yearService.getYearId(id).subscribe(result=>{
      this.year = result.data;
    })
  }
  // show modal stage
  ShowModalAdd() {
    this.stage = {} as Stage;
    this.message = "";
    this.dataSemester();
    this.dataYear();
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id) {
    event.preventDefault();
    this.message = "";
    this.dataSemester();
    this.dataYear();
    this.stageService.getStageId(id).subscribe(result => {
      console.log(result);
      this.stage = result.data;
      this.modalEdit.show();
    })
  }

  ShowModalDelete(event = null, id) {
    event.preventDefault();
    this.stageService.getStageId(id).subscribe(result => {
      console.log(result);
      this.stage = result.data;
      this.modalDelete.show();
    })
  }

  ShowModalDetail(event = null, id) {
    event.preventDefault();
    this.dataSemester();
    this.dataYear();
    this.stageService.getStageId(id).subscribe(result => {
      this.stage = result.data;
      this.modalDetail.show();
    });
  }
  // event stage
  add() {
    const param = {
      stageName: this.stage.stageName,
      dateTimes: this.stage.dateTimes,
      examDate: this.stage.examDate,
      examTime: this.stage.examTime,
      englishTimeExam: this.stage.englishTimeExam,
      seM_ID: this.semester.id,
      yeaR_ID: this.year.id
    }
    this.stageService.add(param).subscribe(result => {
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

  update(id) {
    this.stageService.update(this.stage).subscribe(result => {
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.loadData();
        this.modalEdit.hide();
      }
    })
  }

  delete(id) {
    this.stageService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteStage = this.stages.find(x => x.id === id);
        console.log(deleteStage);
        if (deleteStage) {
          const index = this.stages.indexOf(deleteStage);
          this.stages.splice(index, 1);
        }
        this.modalDelete.hide();
      }
    })
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

}
