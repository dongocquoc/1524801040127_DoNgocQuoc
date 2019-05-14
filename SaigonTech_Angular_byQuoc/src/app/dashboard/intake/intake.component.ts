import { Component, OnInit, ViewChild } from '@angular/core';
import { Intake, IntakeService } from 'src/app/services/intake.service';
import { YearService } from 'src/app/services/year.service';
import { Title } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.css']
})
export class IntakeComponent implements OnInit {

  intakes: Intake[] = [];
  intake: Intake = {} as Intake;
  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private intakeService: IntakeService) { }

  ngOnInit() {
    this.titleService.setTitle("Intake");
    this.loadData();
  }

  public loadData(){
    this.intakeService.getAllIntake().subscribe(result =>{
      console.log(result);
      this.intakes = result.data;
    });
  }

  ShowModalAdd(){
    this.intake = {} as Intake;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.intakeService.getIntakeId(id).subscribe(result =>{
      console.log(result);
      this.intake = result.data;
      this.modalEdit.show();
    })
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.intakeService.getIntakeId(id).subscribe(result =>{
      console.log(result);
      this.intake = result.data;
      this.modalDelete.show();
    })
  }

  add(){
    console.log(this.intake);
    this.intakeService.add(this.intake).subscribe(result =>{
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
    this.intakeService.update(this.intake).subscribe(result =>{
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
    this.intakeService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteIntake = this.intakes.find(x => x.id === id);
        console.log(deleteIntake);
        if(deleteIntake){
          const index = this.intakes.indexOf(deleteIntake);
          this.intakes.splice(index, 1);
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
    this.intakeService.getIntakeId(id).subscribe(result =>{
      console.log(result);
      this.intake = result.data;
      this.modalDetail.show();
    });
  }
}
