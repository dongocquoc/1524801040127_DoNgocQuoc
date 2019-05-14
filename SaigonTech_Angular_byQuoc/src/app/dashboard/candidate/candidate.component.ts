import { Component, OnInit, ViewChild } from '@angular/core';
import { Candidates, CandidateService } from '../../services/candidate.service';
import { Countries, AddressService, Provinces, District } from '../../services/address.service';
import { Title } from '@angular/platform-browser';
import { Semester, SemesterService } from '../../services/semester.service';
import { Year, YearService } from '../../services/year.service';
import { Stage, StageService } from '../../services/stage.service';
import { Catalog, CatalogService } from '../../services/catalog.service';
import { Major, MajorService } from '../../services/major.service';
import { Intake, IntakeService } from '../../services/intake.service';
import { CdType, CandidatetypeService } from '../../services/candidatetype.service';
import { Education, EducationService } from '../../services/education.service';
import { StageDetails, StagedetailService } from '../../services/stagedetail.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Parameter, ParameterService } from '../../services/parameter.service';
import { Documents, DocumentService } from '../../services/document.service';
import { CandidatedocumentService, CandidateDocument } from '../../services/candidatedocument.service';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {


  genders = [
    {id: 1, name: "Male"},
    {id: 2, name: "Female"}
  ];

  marialstatus = [
    {id: 1, name: "Single"},
    {id: 2, name: "Married"},
    {id: 3, name: "Widowed"},
    {id: 4, name: "Divorced"},
    {id: 5, name: "Separate"}
  ];

  finals = [
    {id: false, name: "Undefined"},
    {id: true, name: "Passed"}
  ];

  selectedValuemarial = null;
  selectedValuegender = null;
  selectedValuefinal = null;

  candidates: Candidates[] = [];
  candidate: Candidates = {} as Candidates;

  countries: Countries[] = [];
  country: Countries = {} as Countries;

  countryDetails: Countries[] = [];
  countryDetail: Countries = {} as Countries;

  homecountries: Countries[] = [];
  homecountry: Countries = {} as Countries;

  schools: Provinces[] = [];
  school: Provinces = {} as Provinces;

  provinces: Provinces[] = [];
  province: Provinces = {} as Provinces;

  schoolcitys: Provinces[] = [];
  schoolcity: Provinces = {} as Provinces;

  provinceDetails: Provinces[] = [];
  provinceDetail: Provinces = {} as Provinces;

  districts: District[] = [];
  district: District = {} as District;

  districtDetails: District[] = [];
  districtDetail: District = {} as District;

  semesters: Semester[] = [];
  semester: Semester = {} as Semester;

  years: Year[] = [];
  year: Year = {} as Year;

  stages: Stage[] = [];
  stage: Stage = {} as Stage;

  allstages: Stage[] = [];
  allstage: Stage = {} as Stage;

  stageDetails: Stage[] = [];
  stageDetail: Stage = {} as Stage;

  stagesAdd: Stage[] = [];
  stageAdd: Stage = {} as Stage;

  stageEdits: Stage[] = [];
  stageEdit: Stage = {} as Stage;

  catalogs: Catalog[] = [];
  catalog: Catalog = {} as Catalog;

  majors: Major[] = [];
  major: Major = {} as Major;

  majorAdds: Major[] = [];
  majorAdd: Major = {} as Major;

  intakes: Intake[] = [];
  intake: Intake = {} as Intake;

  candidatetypes: CdType[] = [];
  candidatetype: CdType = {} as CdType;

  educations: Education[] = [];
  education: Education = {} as Education;

  stagedetails: StageDetails[] = [];
  stagedetail: StageDetails = {} as StageDetails;

  stagedetailAdds: StageDetails[] = [];
  stagedetailAdd: StageDetails = {} as StageDetails;
  
  parameters: Parameter[] = [];
  parameter: Parameter = {} as Parameter;
  
  documents: Documents[] = [];
  document: Documents = {} as Documents;

  candidatedocuments: CandidateDocument[] = [];
  candidatedocument: CandidateDocument = {} as CandidateDocument;

  message = '';

  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  @ViewChild('modalDetail') public modalDetail: ModalDirective;
  @ViewChild('modalDocument') public modalDocument: ModalDirective;
  constructor(private titleService: Title, private candidateService: CandidateService, private addressService: AddressService, private stageService: StageService, private semesterService: SemesterService, private yearService: YearService, private catalogService: CatalogService, private majorService: MajorService, private intakeService: IntakeService, private educationService: EducationService, private candidatetypeService: CandidatetypeService, private stagedetailService: StagedetailService, private parameterService: ParameterService, private documentService: DocumentService, private candidatedocumentService: CandidatedocumentService) { }

  ngOnInit() {
    this.titleService.setTitle("Candidate");
    //this.loadData();
    this.dataCandidateByStage();
    this.dataStage();
    this.dataStageByIdEdit();
  }

  public loadData(){
    this.candidateService.getAllCandidate().subscribe(result=>{
      console.log(result);
      this.candidates = result.data;
    })
  }

  public dataCandidateByStage(){
    this.candidateService.getCandidateByStage(this.allstage.id).subscribe(result =>{
      console.log(result);
      this.candidates = result.data;
    });
  }

  // load data stage
  public dataStage(){
    this.stageService.getAllStage().subscribe(result => {
      console.log(result);
      this.allstages = result.data;
    });
  }

  public dataStageAdd(){
    this.stageService.getAllStage().subscribe(result => {
      console.log(result);
      this.stagesAdd = result.data;
    });
  }

  public dataStageDetail(){
    this.stageService.getAllStage().subscribe(result=>{
      console.log(result);
      this.stageDetails = result.data;
    })
  }

  public dataStageEdit(){
    this.stageService.getAllStage().subscribe(result=>{
      console.log(result);
      this.stageEdits = result.data;
    })
  }

  public dataStageById(){
    this.stageService.getStageId(this.allstage.id).subscribe(result =>{
      console.log(result);
      this.allstage = result.data;
    });
  }

  public dataStageByIdEdit(){
    this.stageService.getStageId(this.stageEdit.id).subscribe(result =>{
      console.log(result);
      this.stageEdit = result.data;
    });
  }

  public dataStageByIdEdits(stage_id){
    this.stageService.getStageId(stage_id).subscribe(result =>{
      console.log(result);
      this.stageEdit = result.data;
    });
  }

  public dataStageBySemester(){
    this.stageService.GetStageBySemester(this.semester.id).subscribe(result =>{
      this.stages = result.data;
    });
  }

  public dataStageByYear(){
    this.stageService.GetStageByYear(this.year.id).subscribe(result =>{
      console.log(result);
      this.stages = result.data;
    });
  }

  //load data semester
  public dataSemester(){
    this.semesterService.getAllSemester().subscribe(result =>{
      console.log(result);
      this.semesters = result.data;
    });
  }

  //load data year
  public dataYear(){
    this.yearService.getAllYear().subscribe(result =>{
      console.log(result);
      this.years = result.data;
    });
  }

  //load data catalog
  public dataCatalog(){
    this.catalogService.getAllCatalog().subscribe(result =>{
      console.log(result);
      this.catalogs = result.data;
    });
  }

  //load data major
  public dataMajor(){
    this.majorService.getAllMajor().subscribe(result =>{
      console.log(result);
      this.majors = result.data;
    });
  }

  public dataMajorAdd(){
    this.majorService.getAllMajor().subscribe(result =>{
      console.log(result);
      this.majorAdds = result.data;
    });
  }

  public dataMajorById(){
    this.majorService.getMajorId(this.major.id).subscribe(result=>{
      console.log(result);
      this.major = result.data;
    })
  }

  //load data intake
  public dataIntake(){
    this.intakeService.getAllIntake().subscribe(result =>{
      console.log(result);
      this.intakes = result.data;
    });
  }

  //load data education
  public dataEducation(){
    this.educationService.getAllEducation().subscribe(result =>{
      console.log(result);
      this.educations = result.data;
    });
  }

  //load data candidate type
  public dataCandidateType(){
    this.candidatetypeService.getAllCdType().subscribe(result =>{
      console.log(result);
      this.candidatetypes = result.data;
    });
  }

  //load data stage detail
  public dataMajorByStage(){
    this.stagedetailService.getMajorInStageDetail(this.stage.id).subscribe(result =>{
      console.log(result);
      this.stagedetails = result.data;
    });
  }

  public dataStageDetailByStage(){
    this.stagedetailService.getStageDetailByStageId(this.stage.id).subscribe(result =>{
      console.log(result);
      this.stagedetails = result.data;
    });
  }

  public dataMajorInStage(){
    this.stagedetailService.getMajorByStage(this.allstage.id).subscribe(result =>{
      console.log(result);
      this.stagedetailAdds = result.data;
    })
  }

  //load data country
  public dataCountry() {
    this.addressService.getAllCountry().subscribe(rcountry => {
      console.log(rcountry);
      this.countries = rcountry.data;
    });
  }

  public dataHomeCountry() {
    this.addressService.getAllCountry().subscribe(rcountry => {
      console.log(rcountry);
      this.homecountries = rcountry.data;
    });
  }

  public dataCountryDetail() {
    this.addressService.getAllCountry().subscribe(rcountry => {
      console.log(rcountry);
      this.countryDetails = rcountry.data;
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
    });
  }

  public dataDistrictByProvinceEdit() {
    this.addressService.getDistrictByProvince(this.candidate.provinceAddress).subscribe(result => {
      console.log(result);
      this.districts = result.data;
    });
  }

  //load data province
  public dataProvince() {
    this.addressService.getAllProvince().subscribe(rprovince => {
      console.log(rprovince);
      this.provinces = rprovince.data;
    })
  }

  public dataSchoolCity() {
    this.addressService.getAllProvince().subscribe(rprovince => {
      console.log(rprovince);
      this.schoolcitys = rprovince.data;
    })
  }

  public dataProvinceByCountry() {
    this.addressService.getProvinceByCountry(this.country.id).subscribe(result => {
      console.log(result);
      this.provinces = result.data;
    })
  }

  public dataProvinceByCountryEdit() {
    this.addressService.getProvinceByCountry(this.candidate.countryAddress).subscribe(result => {
      console.log(result);
      this.provinces = result.data;
    })
  }

  //load data parameter
  public dataParameter(){
    this.parameterService.getAll().subscribe(rparameter =>{
      console.log(rparameter);
      this.parameters = rparameter.data;
    });
  }

  //load data document
  public dataDocument(){
    this.documentService.getAllDocument().subscribe(result=>{
      console.log(result);
      this.documents = result.data;
    })
  }

  public dataDocumentID(id){
    this.documentService.getDocumentId(id).subscribe(result=>{
      console.log(result);
      this.document = result.data;
    })
  }

  // event change combobox
  public changeCountry() {
    this.dataProvinceByCountry();
    this.province = {} as Provinces;
    this.district = {} as District;
  }

  public changeCountryEdit() {
    this.dataProvinceByCountryEdit();
    this.province = {} as Provinces;
    this.district = {} as District;
  }

  public changeProvince() {
    this.dataDistrictByProvince();
  }

  public changeProvinceEdit() {
    this.dataDistrictByProvinceEdit();
  }

  //data candidate document
  public dataCandidateDocumentByCandidate(can_id){
    this.candidatedocumentService.GetcandidateDocumentBycandidate(can_id).subscribe(result=>{
      console.log(result);
      this.candidatedocuments = result.data;
    })
  }

  // show modal
  ShowModalAdd() {
    this.candidate = {} as Candidates;
    this.semester = {} as Semester;
    this.year = {} as Year;
    this.catalog = {} as Catalog;
    this.major = {} as Major;
    this.intake = {} as Intake;
    this.country = {} as Countries;
    this.province = {} as Provinces;
    this.district = {} as District;
    this.education = {} as Education;
    this.candidatetype = {} as CdType;
    this.stage = {} as Stage;
    this.province = {} as Provinces;
    this.district = {} as District;
    this.message = "";
    this.dataSemester();
    this.dataYear();
    //this.dataMajor();
    this.dataMajorAdd();
    this.dataCatalog();
    this.dataIntake();
    this.dataEducation();
    this.dataCandidateType();
    this.dataCountry();
    this.dataSchoolCity();
    this.dataHomeCountry();
    //this.dataStageAdd();
    this.dataStage();
    //this.dataParameter();
    //this.dataStageDetailByStage();
    this.dataMajorInStage();
    this.modalAdd.show();
  }

  ShowModalDetail(event = null, id) {
    event.preventDefault();
    console.log("data semester");
    this.dataSemester();
    console.log("data year");
    this.dataYear();
    console.log("data major");
    this.dataMajor();
    console.log("data catalog");
    this.dataCatalog();
    console.log("data intake");
    this.dataIntake();
    console.log("data education");
    this.dataEducation();
    console.log("data candidate tyle");
    this.dataCandidateType();
    console.log("data country");
    this.dataCountry();
    console.log("data province");
    this.dataProvince();
    console.log("data district");
    this.dataDistrict();
    console.log("data stage");
    this.dataStageDetail();
    this.candidateService.getCandidateId(id).subscribe(result=>{
      console.log(result);
      this.candidate = result.data;
      this.modalDetail.show();
    });
  }

  ShowModalEdit(event = null, id) {
    event.preventDefault();
    this.message = "";
    console.log("data semester");
    this.dataSemester();
    //console.log("data year");
    this.dataYear();
    //console.log("data major");
    this.dataMajor();
    //console.log("data catalog");
    this.dataCatalog();
    //console.log("data intake");
    this.dataIntake();
    //console.log("data education");
    this.dataEducation();
    //console.log("data candidate tyle");
    this.dataCandidateType();
    //console.log("data country");
    this.dataCountry();
    //console.log("data province");
    this.dataProvince();
    //console.log("data district");
    this.dataDistrict();
    //console.log("data stage");
    //this.dataStageDetail();
    this.dataStageEdit();
    console.log("data stage by ID")
    this.dataStageByIdEdits(this.candidate.stagE_ID);
    this.candidateService.getCandidateId(id).subscribe(result=>{
      console.log(result);
      this.candidate = result.data;
      alert(this.candidate.stagE_ID);
      this.modalEdit.show();
    });
  }

  ShowModalDocument(event = null, id) {
    event.preventDefault();
    this.dataDocument();
    this.dataCandidateDocumentByCandidate(id);
    this.candidateService.getCandidateId(id).subscribe(result =>{
      console.log(result);
      this.candidate = result.data;
      this.modalDocument.show();
    });
  }

  ShowModalDelete(event = null, id) {
    event.preventDefault();
    this.candidateService.getCandidateId(id).subscribe(result=>{
      console.log(result);
      this.candidate = result.data;
    });
    this.modalDelete.show();
  }

  //event change combobox
  public changeStage() {
    this.dataCandidateByStage();
    this.dataStageById();
  }

  public changeStageEdit() {
    //this.dataCandidateByStage();
    this.dataStageByIdEdit();
  }

  public changeSemester(){
    this.dataStageBySemester();
  }

  public changeYear(){
    this.dataStageByYear();
  }

  public changeMajor(){
    this.dataMajorInStage();
    //this.dataMajor();
    //this.dataMajorByStage();
    //this.dataStageDetailByStage();
  }

  add() {
    const param ={
      candidateId: this.candidate.candidateId,
      lastName: this.candidate.lastName,
      firstName: this.candidate.firstName,
      dateOfBirth: this.candidate.dateOfBirth,
      gender: this.selectedValuegender,
      phone: this.candidate.phone,
      homeAddress: this.candidate.homeAddress,
      countryAddress: this.country.id,
      provinceAddress: this.province.id,
      districtAddress: this.district.id,
      placeOfBirth: this.candidate.placeOfBirth,
      maritalStatus: this.selectedValuemarial,
      highSchoolName: this.candidate.highSchoolName,
      highSchoolCity: this.schoolcity.id,
      graduateYear: this.candidate.graduateYear,
      registryDate: this.candidate.registryDate,
      email: this.candidate.email,
      cardId: this.candidate.cardId,
      finalResult: this.selectedValuefinal,
      documentCode: this.candidate.documentCode,
      stagE_ID: this.allstage.id,
      majoR_ID: this.stagedetailAdd.major_ID,
      cataloG_ID: this.catalog.id,
      countrY_ID: this.homecountry.id,
      educatioN_ID: this.education.id,
      yeaR_ID: this.allstage.yeaR_ID,
      typE_ID: this.candidatetype.id,
      intakE_ID: this.intake.id,
      seM_ID: this.allstage.seM_ID
    }
    this.candidateService.add(param).subscribe(result =>{
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataCandidateByStage();
        this.modalAdd.hide();
      }
    })
  }

  update(idd){
    const param ={
      id: idd,
      candidateId: this.candidate.candidateId,
      lastName: this.candidate.lastName,
      firstName: this.candidate.firstName,
      dateOfBirth: this.candidate.dateOfBirth,
      gender: this.candidate.gender,
      phone: this.candidate.phone,
      homeAddress: this.candidate.homeAddress,
      countryAddress: this.candidate.countryAddress,
      provinceAddress: this.candidate.provinceAddress,
      districtAddress: this.candidate.districtAddress,
      placeOfBirth: this.candidate.placeOfBirth,
      maritalStatus: this.candidate.maritalStatus,
      highSchoolName: this.candidate.highSchoolName,
      highSchoolCity: this.candidate.highSchoolCity,
      graduateYear: this.candidate.graduateYear,
      registryDate: this.candidate.registryDate,
      email: this.candidate.email,
      cardId: this.candidate.cardId,
      finalResult: this.candidate.finalResult,
      documentCode: this.candidate.documentCode,
      stagE_ID: this.stageEdit.id,
      majoR_ID: this.candidate.majoR_ID,
      cataloG_ID: this.candidate.cataloG_ID,
      countrY_ID: this.candidate.countrY_ID,
      educatioN_ID: this.candidate.educatioN_ID,
      yeaR_ID: this.stageEdit.yeaR_ID,
      typE_ID: this.candidate.typE_ID,
      intakE_ID: this.candidate.intakE_ID,
      seM_ID: this.stageEdit.seM_ID
    }
    this.candidateService.update(param).subscribe(result=>{
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }
      if(result.errorCode === 1){
        this.dataCandidateByStage();
        this.modalEdit.hide();
      }
    })
  }

  delete(id) {
    this.candidateService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteCandidate = this.candidates.find(x => x.id === id);
        console.log(deleteCandidate);
        if (deleteCandidate) {
          const index = this.candidates.indexOf(deleteCandidate);
          this.candidates.splice(index, 1);
        }
        this.modalDelete.hide();
      }
    })
  }

  changeStatus(id, e, iid) {
    const status = e.target.checked;
    if (status){
      const param = {
        note: this.candidatedocument.note,
        doC_ID: iid,
        c_ID: this.candidate.id
      }
      this.candidatedocumentService.add(param).subscribe(rs =>{
        console.log(rs);
      });
    }
    else{
      this.candidatedocumentService.delete(id).subscribe(rsd => {
        if (rsd.errorCode === 0) {
          const deleteCandidateDopcument = this.candidatedocuments.find(x => x.id === id);
          console.log(deleteCandidateDopcument);
          if (deleteCandidateDopcument) {
            const index = this.candidatedocuments.indexOf(deleteCandidateDopcument);
            this.candidates.splice(index, 1);
          }
          this.modalDelete.hide();
        }
      });
    }
    // this.candidatedocumentService.update(id, status).subscribe(result => {
    //     if (status){
    //       const param = {
    //         note: this.candidatedocument.note,
    //         doC_ID: this.document.id,
    //         c_ID: this.candidate.id
    //       }
    //       this.candidatedocumentService.add(param).subscribe(rs =>{
    //         console.log(rs);
    //       });
    //     }
    //     else{
    //       this.candidateService.delete(id).subscribe(rsd => {
    //         if (rsd.errorCode === 0) {
    //           const deleteCandidateDopcument = this.candidatedocuments.find(x => x.id === id);
    //           console.log(deleteCandidateDopcument);
    //           if (deleteCandidateDopcument) {
    //             const index = this.candidatedocuments.indexOf(deleteCandidateDopcument);
    //             this.candidates.splice(index, 1);
    //           }
    //           this.modalDelete.hide();
    //         }
    //       });
    //     }
    // });
}

  // event lose
  close() {
    this.modalAdd.hide();
    this.modalDetail.hide();
    this.modalEdit.hide();
    this.modalDelete.hide();
    this.modalDocument.hide();
  }
}
