import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    // animation triggers go here
    trigger('openClose', [
      // ...
      state('open', style({
        visibility: 'visible',
        opacity: 1,
      })),
      state('closed', style({
        visibility: 'hidden',
        opacity: 0.5,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})

export class UserComponent implements OnInit {

  // biến toàn cục
  user: User = {} as User;
  users: User[] = [];
  form: FormGroup;
  role: string;
  isStatus = false;
  resultStatus = '';
  statusFile: any;
  message = '';

  statuss = [
    {id: 0, name: "Block"},
    {id: 1, name: "Active"}
  ];

  selectedValuestatus = null;

  @ViewChild('modal') modal: ModalDirective;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getLoad();
    this.createForm();

    console.log(this.form);
    console.log(this.form.get('name'));
    this.role = localStorage.getItem('username');
    console.log(this.role);
  }


  getLoad() {
    this.userService.getAll().subscribe(user => {
      this.users = user.data;
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.minLength(6), Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      email: ['', Validators.required],
      phone: ['', [Validators.minLength(10), Validators.required]],
      status: ['', Validators.required],
      file: null
    });
  }

  get name() {
    return this.form.get('name');
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get status() {
    return this.form.get('status');
  }

  // binding từ control tới object 
  setUser() {
    this.user.name = this.form.get('name').value;
    this.user.userName = this.form.get('username').value;
    this.user.passWord = this.form.get('password').value;
    this.user.email = this.form.get('email').value;
    this.user.phone = this.form.get('phone').value;
    this.user.imagePath = this.form.get('file').value;
    this.user.status = this.form.get('status').value;

  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('name', this.user.name);
    input.append('username', this.user.userName);
    input.append('password', this.user.passWord);
    input.append('email', this.user.email);
    input.append('phone', this.user.phone.toString());
    // input.append('status', this.user.status.toString());
    input.append('status', this.selectedValuestatus.toString());
    input.append('file', this.user.imagePath);
    return input;
  }

  // show và binding từ object đến formcontrol
  showModel(event = null, id: number) {
    this.message = "";
    if (event) {
      event.preventDefault();
    }
    if (id === 0 || id === undefined) {
      this.user = {} as User;
      console.log(this.user);
      this.form.enable();
      this.form.reset({
        name: this.user.name,
        username: this.user.userName,
        password: this.user.passWord,
        email: this.user.email,
        phone: this.user.phone,
        status: this.user.status,
        file: null

      });

      console.log(this.form.get('name'));
      this.modal.show();

    } else {

      this.userService.getObject(id).subscribe(user => {
        this.user = user.data;
        if (this.user.imagePath === null) {
          this.statusFile = null;
        }
        else {
          this.statusFile = this.user.imagePath;
        }

        this.form.setValue({
          name: this.user.name,
          username: this.user.userName,
          password: this.user.passWord,
          email: this.user.email,
          phone: this.user.phone,
          status: this.user.status,
          file: this.statusFile
        });
        this.form.get('name').disable({ onlySelf: true });
        this.form.get('username').disable({ onlySelf: true });
        this.form.get('password').disable({ onlySelf: true });
        this.form.get('email').disable({ onlySelf: true });
        this.form.get('phone').disable({ onlySelf: true });
        this.modal.show();
      });
    }
  }

  // thay đổi sau mỗi lần nhập file
  public onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('file').patchValue(file);
      console.log(file);

    }
  }

  //SUBMIT
  onSubmit() {

    // bingding từ control đến data
    this.setUser();
    // data gắn vào formdata
    //console.log(this.user);
    const formModel = this.prepareSave();
    if (this.user.id === undefined || this.user.id === 0) {
      this.userService.add(formModel).subscribe(user => {
        if(user.errorCode !== 1){
          this.message = user.messege;
        }
        if(user.errorCode === 1){
          this.getLoad();
          // console.log(this.user);
          this.modal.hide();
          this.resultStatus = ' Add Succees';
          this.isStatus = true;
          setTimeout(() => {
            this.isStatus = false;
            console.log(this.isStatus);
          }, 4000);
        }
      }
      );
    } else {
      console.log("vao edit");
      console.log(this.role);
      this.userService.update(this.user.id, formModel, this.role).subscribe(user => {
        this.getLoad();
        this.modal.hide();
        this.resultStatus = ' Update Succees';
        this.isStatus = true;
        setTimeout(() => {
          this.isStatus = false;
          console.log(this.isStatus);
        }, 4000);
      });
    }
  }
}



