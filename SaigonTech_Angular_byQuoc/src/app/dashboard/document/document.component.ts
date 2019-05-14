import { Component, OnInit, ViewChild } from '@angular/core';
import { Documents, DocumentService } from '../../services/document.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';
import { InputtypeService, InputType } from '../../services/inputtype.service';
import { StatusService, Status } from '../../services/status.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documents: Documents[] = [];
  document: Documents = {} as Documents;

  inputtypes: InputType[] =[];
  inputtype: InputType = {} as InputType;

  statuss: Status[] = [];
  status: Status = {} as Status; 

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private documentService: DocumentService, private inputtypeService: InputtypeService, private statusService: StatusService) { }

  ngOnInit() {
    this.titleService.setTitle("Document");
    this.loadData();
    this.dataStatus();
    this.dataInputType();
  }

  //load data document
  public loadData(){
    this.documentService.getAllDocument().subscribe(result =>{
      console.log(result);
      this.documents = result.data;
    })
  }

  public dataDocumentById(id) {
    this.documentService.getDocumentId(id).subscribe(result => {
      console.log(result);
      this.document = result.data;
    })
  }

  //load data input type
  public dataInputType(){
    this.inputtypeService.getAllInput().subscribe(result =>{
      console.log(result);
      this.inputtypes = result.data;
    })
  }

  public dataInputTypeById(id){
    this.inputtypeService.getInputId(id).subscribe(result =>{
      console.log(result);
      this.inputtype = result.data;
    })
  }

  //load data status
  public dataStatus(){
    this.statusService.getAllStatus().subscribe(result =>{
      console.log(result);
      this.statuss = result.data;
    })
  }

  public dataStatusById(id){
    this.statusService.getStatusId(id).subscribe(result =>{
      console.log(result);
      this.status = result.data;
    })
  }

  ShowModalAdd(){
    this.document = {} as Documents;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.documentService.getDocumentId(id).subscribe(result =>{
      console.log(result);
      this.document = result.data;
      this.modalEdit.show();
    });
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.documentService.getDocumentId(id).subscribe(result =>{
      console.log(result);
      this.document = result.data;
      this.modalDelete.show();
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
    this.documentService.getDocumentId(id).subscribe(result =>{
      console.log(result);
      this.document = result.data;
      this.modalDetail.show();
    });
  }

  add(){
    const param = {
      nameInEnglish: this.document.nameInEnglish,
      nameInVietnamese: this.document.nameInVietnamese,
      inputtype: this.inputtype.id,
      status: this.status.id,
      sequenceNumber: this.document.sequenceNumber,
      note: this.document.note
    }
    this.documentService.add(param).subscribe(result =>{
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
    this.documentService.update(this.document).subscribe(result =>{
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

  delete(id){
    this.documentService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteDocument = this.documents.find(x => x.id === id);
        console.log(deleteDocument);
        if(deleteDocument){
          const index = this.documents.indexOf(deleteDocument);
          this.documents.splice(index, 1);
        }
        this.modalDelete.hide();
      }
    });
  }

}
