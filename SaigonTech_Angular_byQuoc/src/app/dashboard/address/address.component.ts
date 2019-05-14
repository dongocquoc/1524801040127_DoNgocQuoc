import { Component, OnInit, ViewChild } from '@angular/core';
import { Countries, Provinces, District, AddressService } from '../../services/address.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  //Country
  countries: Countries[] = [];
  country: Countries = {} as Countries;

  //Province
  provinces: Provinces[] = [];
  province: Provinces = {} as Provinces;

  //District
  districts: District[] = [];
  district: District = {} as District;

  message = '';

  //aaaa
  CountrySelect: string;

  //View Country
  @ViewChild('modalAddCountry') public modalAddCountry: ModalDirective;
  @ViewChild('modalEditCountry') public modalEditCountry: ModalDirective;
  @ViewChild('modalDeleteCountry') public modalDeleteCountry: ModalDirective;
  @ViewChild('modalDetailCountry') public modalDetailCountry: ModalDirective;

  //View Province
  @ViewChild('modalAddProvince') public modalAddProvince: ModalDirective;
  @ViewChild('modalEditProvince') public modalEditProvince: ModalDirective;
  @ViewChild('modalDeleteProvince') public modalDeleteProvince: ModalDirective;
  @ViewChild('modalDetailProvince') public modalDetailProvince: ModalDirective;

  //View District
  @ViewChild('modalAddDistrict') public modalAddDistrict: ModalDirective;
  @ViewChild('modalEditDistrict') public modalEditDistrict: ModalDirective;
  @ViewChild('modalDeleteDistrict') public modalDeleteDistrict: ModalDirective;
  @ViewChild('modalDetailDistrict') public modalDetailDistrict: ModalDirective;

  constructor(private titleService: Title, private addressService: AddressService) { }

  ngOnInit() {
    this.titleService.setTitle("Address");
    this.loadData();
  }

  // load data address
  public loadData() {
    this.dataCountry();
    // this.dataDistrict();
    // this.dataProvince();
  }

  //load data country
  public dataCountry() {
    this.addressService.getAllCountry().subscribe(rcountry => {
      console.log(rcountry);
      this.countries = rcountry.data;
    });
  }

  //load data district
  public dataDistrict() {
    this.addressService.getAllDistrict().subscribe(rdistrict => {
      console.log(rdistrict);
      this.districts = rdistrict.data;
    });
  }

  public dataDistrictByProvince() {
    this.addressService.getDistrictByProvince(this.province.id).subscribe(result => {
      console.log(result);
      this.districts = result.data;
    })
  }

  //load data province
  public dataProvince() {
    this.addressService.getAllProvince().subscribe(rprovince => {
      console.log(rprovince);
      this.provinces = rprovince.data;
    })
  }

  public dataProvinceByCountry() {
    this.addressService.getProvinceByCountry(this.country.id).subscribe(result => {
      console.log(result);
      this.provinces = result.data;
    })
  }

  //show modal country
  ShowModalAddCountry() {
    this.country = {} as Countries;
    this.province = {} as Provinces;
    this.district = {} as District;
    this.message = "";
    this.modalAddCountry.show();
  }

  ShowModalEditCountry(id) {
    this.addressService.getCountryId(id).subscribe(result => {
      console.log(result);
      this.message = "";
      this.country = result.data;
      this.modalEditCountry.show();
    });
  }

  ShowModalDeleteCountry(id) {
    this.addressService.getCountryId(id).subscribe(result => {
      console.log(result);
      this.country = result.data;
      this.modalDeleteCountry.show();
    });
  }

  //show modal district
  ShowModalAddDistrict() {
    this.district = {} as District;
    this.message = "";
    this.modalAddDistrict.show();
  }

  ShowModalEditDistrict(id) {
    this.addressService.getDistrictId(id).subscribe(result => {
      console.log(result);
      this.message = "";
      this.district = result.data;
      this.modalEditDistrict.show();
    });
  }

  ShowModalDeleteDistrict(id) {
    this.addressService.getDistrictId(id).subscribe(result => {
      console.log(result);
      this.district = result.data;
      this.modalDeleteDistrict.show();
    });
  }

  //show modal province
  ShowModalAddProvince() {
    this.province = {} as Provinces;
    this.district = {} as District;
    this.message = "";
    this.modalAddProvince.show();
  }

  ShowModalEditProvince(id) {
    alert(this.country.id);
    this.addressService.getProvinceId(id).subscribe(result => {
      console.log(result);
      this.message = "";
      this.province = result.data;
      this.modalEditProvince.show();
    });
  }

  ShowModalDeleteProvince(id) {
    this.addressService.getProvinceId(id).subscribe(result => {
      console.log(result);
      this.province = result.data;
      this.modalDeleteProvince.show();
    });
  }

  // event change combobox
  public changeCountry() {
    this.dataProvinceByCountry();
  }

  public changeProvince() {
    this.dataDistrictByProvince();
  }

  // event Country
  addCountry(){
    this.addressService.addCountry(this.country).subscribe(result =>{
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataCountry();
        this.modalAddCountry.hide();
      }
    })
  }

  updateCountry(id){
    this.addressService.updateCountry(this.country).subscribe(result =>{
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataCountry();
        this.modalEditCountry.hide();
      }
    })
  }

  deleteCountry(id){
    this.addressService.deleteCountry(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteCountry = this.countries.find(x => x.id === id);
        console.log(deleteCountry);
        if(deleteCountry){
          const index = this.countries.indexOf(deleteCountry);
          this.countries.splice(index, 1);
        }
        this.modalDeleteCountry.hide();
      }
    });
  }

  // event Province
  addProvince(){
    const param = {
      countrY_ID: this.country.id,
      provinceName: this.province.provinceName
    }
    this.addressService.addProvince(param).subscribe(result =>{
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataProvinceByCountry();
        this.modalAddProvince.hide();
      }
    })
  }

  updateProvince(id){
    this.addressService.updateProvince(this.province).subscribe(result =>{
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataProvinceByCountry();
        this.modalEditProvince.hide();
      }
    })
  }

  deleteProvince(id){
    this.addressService.deleteProvince(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteProvince = this.provinces.find(x => x.id === id);
        console.log(deleteProvince);
        if(deleteProvince){
          const index = this.provinces.indexOf(deleteProvince);
          this.provinces.splice(index, 1);
        }
        this.modalDeleteProvince.hide();
      }
    });
  }

  // event District
  addDistrict(){
    const param = {
      districtName: this.district.districtName,
      provincE_ID: this.province.id,
      countrY_ID: this.country.id
    }
    this.addressService.addDistrict(param).subscribe(result =>{
      console.log(result);
      this.dataCountry();
      this.dataProvinceByCountry();
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataDistrictByProvince();
        this.modalAddDistrict.hide();
      }
    })
  }

  updateDistrict(id){
    this.addressService.updateDistrict(this.district).subscribe(result =>{
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataDistrictByProvince();
        this.modalEditDistrict.hide();
      }
    })
  }

  deleteDistrict(id){
    this.addressService.deleteDistrict(id).subscribe(result =>{
      if(result.errorCode === 1){
        const deleteDistrict = this.districts.find(x => x.id === id);
        console.log(deleteDistrict);
        if(deleteDistrict){
          const index = this.districts.indexOf(deleteDistrict);
          this.districts.splice(index, 1);
        }
        this.modalDeleteDistrict.hide();
      }
    });
  }
  // event close
  close(){
    this.modalAddCountry.hide();
    this.modalEditCountry.hide();
    this.modalDeleteCountry.hide();

    this.modalAddProvince.hide();
    this.modalEditProvince.hide();
    this.modalDeleteProvince.hide();

    this.modalAddDistrict.hide();
    this.modalEditDistrict.hide();
    this.modalDeleteDistrict.hide();
  }
}
