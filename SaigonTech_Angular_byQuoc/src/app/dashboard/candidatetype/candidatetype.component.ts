import { Component, OnInit, ViewChild } from '@angular/core';
import { CdType, CandidatetypeService } from 'src/app/services/candidatetype.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-candidatetype',
  templateUrl: './candidatetype.component.html',
  styleUrls: ['./candidatetype.component.css']
})
export class CandidatetypeComponent implements OnInit {

  cdtypes: CdType[] = [];
  cdtype: CdType = {} as CdType;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private CdTypeService: CandidatetypeService) { }

  ngOnInit() {
    this.titleService.setTitle("Candidate Type");
    this.loadData();
  }

  public loadData(){
    this.CdTypeService.getAllCdType().subscribe(result =>{
      console.log(result);
      this.cdtypes = result.data;
    })
  }

  ShowModalAdd(){
    this.cdtype = {} as CdType;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.CdTypeService.getCdTypeId(id).subscribe(result =>{
      console.log(result);
      this.cdtype = result.data;
      this.modalEdit.show();
    })
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.CdTypeService.getCdTypeId(id).subscribe(result =>{
      console.log(result);
      this.cdtype = result.data;
      this.modalDelete.show();
    })
  }

  add() {
    this.CdTypeService.add(this.cdtype).subscribe(result => {
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
    this.CdTypeService.update(this.cdtype).subscribe(result =>{
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
    this.CdTypeService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteCdType = this.cdtypes.find(x => x.id === id);
        console.log(deleteCdType);
        if(deleteCdType){
          const index = this.cdtypes.indexOf(deleteCdType);
          this.cdtypes.splice(index, 1);
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
    this.CdTypeService.getCdTypeId(id).subscribe(result => {
      console.log(result);
      this.cdtype = result.data;
      this.modalDetail.show();
    });
  }
}
