import { Component } from '@angular/core';
import { LocalDataService } from 'src/app/local-data.service';
import { Password } from 'src/app/password';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NewAdmin } from 'src/app/new-admin';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  done = false;
  doneText = 'Admin Activated. Please Login using Email id ';
  title = 'my-new-project';
  homeEnable = false;
  loginDone = false;
  loginDoneText = 'User is authenticated , TIME  : ';
  warning = false;
  passwords: Array<Password> = [];
  password = '';
  emailLogin = '';
  error = false;
  altaddressClicked = false;
  errorText = '';
  numdate = Date.now();
  newUserFlag = true;
  adminRegForm: FormGroup;
  newAdmin: Array<NewAdmin> = [];
  addCheck = false;
  addBtnDisable = false;
  deleteFlag = false ;
  doneTextEmail = '';
  get name() { return this.adminRegForm.get('name'); }
  get id() { return this.adminRegForm.get('id'); }
  get phone() { return this.adminRegForm.get('phone'); }
  get dob() { return this.adminRegForm.get('dob'); }
  get address() { return this.adminRegForm.get('address'); }
  get emailNew() { return this.adminRegForm.get('email'); }
  get email() { return this.adminRegForm.get('email'); }
  get pwd() { return this.adminRegForm.get('password'); }
  get altaddress() { return this.adminRegForm.get('altaddress') as FormArray; }
  constructor(private localData: LocalDataService, private fb: FormBuilder) {
    this.localData.getPasswordData()
      .subscribe((password: Password[]) => this.passwords = password);
  }
  ngOnInit(): void {
    this.adminRegForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern(/^[a-zA-Z]*$/)]],
      id: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
      dob: [''],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
      // tslint:disable-next-line:max-line-length
      email: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
      altaddress: this.fb.array([])
    });
  }
  loginCheck(): void {
    this.done = false;
    let check = this.passwords.some(password => ((password.email === this.emailLogin) && (password.password === this.password)));
    if (!check) {
      check = this.newAdmin.some(password => ((password.email === this.emailLogin) && (password.password === this.password)));
    }
    if (check) {
      this.homeEnable = true;
      this.loginDone = true;
      this.warning = false;
      this.password = '';
      this.emailLogin = '';
      this.error = false;
      const currentDate = Date.now();
      this.numdate = currentDate;
      setTimeout(() => {
        this.loginDone = false;
      }, 18000);
    } else {
      this.homeEnable = false;
      this.warning = true;
      this.error = true;
      if (this.emailLogin.trim() === '' || this.password.trim() === '') {
        this.errorText = '|---- Email/Password Cannot be Blank ----|';
      } else {
        this.errorText = '|---- Incorrct Email Id/ Passoword.Please Register Admin or try Email/Password Again ----|';
      }
    }
  }
  logOut(event): void {
    if (event === 'true') {
      this.homeEnable = false;
    } else {
      this.homeEnable = true;
    }
  }
  newUser(value: string): void {
    if (value === 'login') {
      this.newUserFlag = true;
      this.done = false;
      this.clear();
    } else if (value === 'newUser') {
      this.newUserFlag = false;
      this.done = false;
      this.error = false;
      this.password = '';
      this.emailLogin = '';
      this.clear();
    }
  }
  addAdmin(): void {
    const name = String(this.adminRegForm.get('name').value);
    const id = String(this.adminRegForm.get('id').value);
    const phone = String(this.adminRegForm.get('phone').value);
    const dob = String(this.adminRegForm.get('dob').value);
    const address = String(this.adminRegForm.get('address').value);
    const email = String(this.adminRegForm.get('email').value);
    const password = String(this.adminRegForm.get('password').value);
    const newAdmin: NewAdmin = {
      name: name,
      id: id,
      phone: phone,
      dob: dob,
      address: address,
      email: email,
      password: password
    };

    const adress = this.adminRegForm.controls['address'].value;
    const aladdress = this.adminRegForm.controls['altaddress'].value;
    if (aladdress.length === 0) {
      this.altaddressClicked = false;
      this.newAdmin.push(newAdmin);
      this.newUserFlag = true;
      this.done = true;
      this.doneTextEmail = email;
      this.clear();
    } else {
    aladdress.forEach(element => {
      if (element === adress) { this.addCheck = true; } else {
        this.altaddressClicked = false;
        this.newAdmin.push(newAdmin);
        this.newUserFlag = true;
        this.done = true;
        this.doneTextEmail = email;
        this.clear();
      }
    }); }
  }
  addAddress(): void {
    console.log(this.adminRegForm);
    if (this.altaddressClicked === false && this.deleteFlag === false) {
    this.altaddress.push(this.fb.control(''));
    this.altaddressClicked = true;
    this.addBtnDisable = true ;
    } else if (this.altaddressClicked === false) {
    this.altaddressClicked = true;
    this.addBtnDisable = true ;
    }
  }
  clear(): void {
    this.adminRegForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern(/^[a-zA-Z]*$/)]],
      id: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
      dob: [''],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
      // tslint:disable-next-line:max-line-length
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
      altaddress: this.fb.array([])
    });
    this.altaddressClicked = false;
    this.addBtnDisable = false;
    this.deleteFlag = false;
  }
  deleteAltAdress(): void {
    this.altaddressClicked = false;
    this.addBtnDisable = false;
    this.deleteFlag = true;
  }
}
