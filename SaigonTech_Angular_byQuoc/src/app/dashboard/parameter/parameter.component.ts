import { Component, OnInit, ViewChild } from '@angular/core';
import { ParameterService, Parameter } from 'src/app/services/parameter.service';
import { Year, YearService } from 'src/app/services/year.service';
import { Semester, SemesterService } from 'src/app/services/semester.service';
import { Intake, IntakeService } from 'src/app/services/intake.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  parameter: Parameter = {} as Parameter;
  public parameters: Parameter[] = [];

  year: Year = {} as Year;
  years: Year[] = [];

  semesters: Semester[] = [];
  semester: Semester = {} as Semester;

  intake: Intake = {} as Intake;
  intakes: Intake[] = [];


  @ViewChild('modal') modal: ModalDirective;
  constructor(private parameterservice: ParameterService, private semeterservice: SemesterService, private yearservice: YearService, private intakeserviece: IntakeService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Parameter');
    this.Load();
    //this.LoadDataForeign();
  }

  // có dữ liệu tại parameters
  Load() {

    this.parameterservice.getAll().subscribe(para => {

      this.parameters = para.data;
      console.log(this.parameters);
      for (let para of this.parameters) {

        this.getNameSemeter(para.semid);
        this.getNameYear(para.yearid);
        this.getNameIntake(para.intakeid);

      }
    });
    console.log(this.parameters);


  }

  // LoadDataForeign() {
  //   console.log("1");
  //   console.log(this.parameters);
  //   // ở đây có dữ liệu của đối tượng + semeter, + year, + intake
  //   for (let para of this.parameters) {
  //     console.log("3");
  //         console.log(para.semid);
  //       this.getNameSemeter(para.semid);
  //       console.log("2");
  //   }


  // }


  // Method lấy tên khóa ngoại
  getNameSemeter(semId: number) {
    this.semeterservice.getSemesterId(semId).subscribe(seme => {
      this.semester = seme.data;
    });
  }

  getNameYear(yearId: number) {
    this.yearservice.getYearId(yearId).subscribe(year => {
      this.year = year.data;
    });
  }

  getNameIntake(intakeId) {
    this.intakeserviece.getIntakeId(intakeId).subscribe(intake => {
      this.intake = intake.data;
    });
  }
  // End  


  // Method lấy dữ liệu cho comboxbox combox
  public getSemeter() {
    this.semeterservice.getAllSemester().subscribe(seme => {
      this.semesters = seme.data;

    });
  }
  public getYear() {
    this.yearservice.getAllYear().subscribe(year => {
      this.years = year.data;
      console.log(this.years);
    });
  }
  public getIntake() {
    this.intakeserviece.getAllIntake().subscribe(intake => {
      this.intakes = intake.data;
      console.log(this.intakes);
    });
  }
  // End 


  // có dữ liệu cho parameter
  showModel(event = null, id: number) {
    if (event) {
      event.preventDefault();
    }
    this.getSemeter();
    this.getIntake();
    this.getYear();
    this.parameterservice.getObject(id).subscribe(para => {
      if (para.errorCode === 0) {
        this.parameter = para.data;
      }
    });


    this.modal.show();
  }

  save() {
    if (this.parameter.id === 0 || this.parameter.id === undefined) {
      console.log('Không lấy được dữ liệu');
    } else {
      this.parameterservice.update(this.parameter).subscribe(para => {
        this.Load();
        this.modal.hide();

      });
    }

  }
}
