import { Component, OnInit, ViewChild } from '@angular/core';
import { Catalog, CatalogService } from '../../services/catalog.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalogs: Catalog[] = [];
  catalog: Catalog = {} as Catalog;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  constructor(private titleService: Title, private catalogService: CatalogService) { }

  ngOnInit() {
    this.titleService.setTitle("Catalog");
    this.loadData();
  }

  public loadData(){
    this.catalogService.getAllCatalog().subscribe(result =>{
      console.log(result);
      this.catalogs = result.data;
    });
  }

  ShowModalAdd(){
    this.catalog = {} as Catalog;
    this.message = "";
    this.modalAdd.show();
  }

  ShowModalEdit(event = null, id){
    event.preventDefault();
    this.message = "";
    this.catalogService.getCatalogId(id).subscribe(result =>{
      console.log(result);
      this.catalog = result.data;
      this.modalEdit.show();
    });
  }

  ShowModalDelete(event = null, id){
    event.preventDefault();
    this.catalogService.getCatalogId(id).subscribe(result =>{
      console.log(result);
      this.catalog = result.data;
      this.modalDelete.show();
    });
  }

  add(){
    this.catalogService.add(this.catalog).subscribe(result =>{
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
    this.catalogService.update(this.catalog).subscribe(result =>{
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
    this.catalogService.delete(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteCatalog = this.catalogs.find(x => x.id === id);
        console.log(deleteCatalog);
        if(deleteCatalog){
          const index = this.catalogs.indexOf(deleteCatalog);
          this.catalogs.splice(index, 1);
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
    this.catalogService.getCatalogId(id).subscribe(result =>{
      console.log(result);
      this.catalog = result.data;
      this.modalDetail.show();
    });
  }
}
