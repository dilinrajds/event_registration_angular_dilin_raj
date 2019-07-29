import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Namez } from 'src/app/user-data/names';
import { Input } from '@angular/core';
import { LocalDataService } from 'src/app/local-data.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  allName: Array<Namez> = []; // array contains all data
  allNameLocal: Array<Namez> = [];
  errorText = '|---- User Attended for 2018 Event Cannot register for 2019 Event ----|';
  name = '';
  email = '';
  phone = '';
  error = false;
  displayLength = true; // to display length
  displayLengthFake = false; // fake to use for css align
  displayDelete = false;
  length = 0;
  editMode = false;
  editModeVal = 0;
  addMode = true;
  deleteMode = false;
  colorChange = '';
  addShow = false;
  nameTest = false;
  emailTest = false;
  phoneTest = false;
  companyTest = false;
  subjectTest = false;
  cusTest = false;
  company = '';
  subject = '';
  cus = '';
  oldMode = false;
  @Output() logOut = new EventEmitter<string>();
  constructor(private localData: LocalDataService) {
  }

  ngOnInit() {
    this.getLocalData('2019');
  }
  addPost(): void { // adding element to array
    this.error = false;

    const newValue: Namez = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      company: this.company,
      subject: this.subject,
      cus: this.cus
    };
    const check = this.allNameLocal.some(allNameLocal => allNameLocal.email === newValue.email);
    if (check) {
      this.error = true;
      this.addShow = false;
    } else {
    this.error = false;
      this.allName.push(newValue);
      this.length = this.allName.length;
      this.name = '';
      this.email = '';
      this.phone = '';
      this.cus = '';
      this.subject = '';
      this.company = '';
      this.addShow = false;
      this.nameTest = false;
      this.emailTest = false;
      this.phoneTest = false;
      this.companyTest = false;
      this.subjectTest = false;
      this.cusTest = false;
    }

  }
  edit(val: number): void { // editing element in array
    this.error = false;
    this.addShow = false;
    this.name = this.allName[val].name;
    this.email = this.allName[val].email;
    this.phone = this.allName[val].phone;
    this.cus = this.allName[val].cus;
    this.subject = this.allName[val].subject;
    this.company = this.allName[val].company;
    this.editModeVal = val;
    this.editMode = true;
    this.addMode = false;
    this.displayDelete = false;
    this.nameTest = true;
    this.emailTest = true;
    this.phoneTest = true;
    this.companyTest = true;
    this.subjectTest = true;
    this.cusTest = true;
  }
  update(): void { // updating element in array
    const check = this.allNameLocal.some(allNameLocal => allNameLocal.email === this.email);
    if (check) {
      this.error = true;
      this.addShow = false;
    } else {
    this.error = false;
    this.allName[this.editModeVal].name = this.name;
    this.allName[this.editModeVal].email = this.email;
    this.allName[this.editModeVal].phone = this.phone;
    this.allName[this.editModeVal].company = this.company;
    this.allName[this.editModeVal].subject = this.subject;
    this.allName[this.editModeVal].cus = this.cus;
    this.editMode = false;
    this.addMode = true;
    this.name = '';
    this.email = '';
    this.phone = '';
    this.cus = '';
    this.subject = '';
    this.company = '';
    this.addShow = false;
    this.nameTest = false;
    this.emailTest = false;
    this.phoneTest = false;
    this.companyTest = false;
    this.subjectTest = false;
    this.cusTest = false;
  }
}
  cancel(): void {
  this.editMode = false; // for cancel button
    this.name = '';
    this.email = '';
    this.phone = '';
    this.cus = '';
    this.subject = '';
    this.company = '';
    this.error = false;
    this.editMode = false;
    this.addMode = true;
    this.deleteMode = false;
    this.nameTest = false;
    this.emailTest = false;
    this.phoneTest = false;
    this.companyTest = false;
    this.subjectTest = false;
    this.cusTest = false;
  }
  delete(val: number): void { // to display child part in main component
    this.editModeVal = val;
    this.displayDelete = true;
    this.displayLength = false;
    this.editMode = false;
    this.addMode = false;
    this.deleteMode = true;
    this.error = false;
  }
  displayLengthFun(event): void { // callback from child.disabling child part from main component
    if (event === 'true') {
      this.displayLength = true;
      this.displayDelete = false;
    }
    this.length = this.allName.length;
    this.editMode = false;
    this.addMode = true;
    this.deleteMode = false;
  }
  callBackError(event): void {
    if (event === 'nameFalse') {
      this.nameTest = false;
    } else if (event === 'nameTrue') {
      this.nameTest = true;
    }
    if (event === 'emailFalse') {
      this.emailTest = false;
    } else if (event === 'emailTrue') {
      this.emailTest = true;
    }
    if (event === 'phoneFalse') {
      this.phoneTest = false;
    } else if (event === 'phoneTrue') {
      this.phoneTest = true;
    }
    if (event === 'companyFalse') {
      this.companyTest = false;
    } else if (event === 'companyTrue') {
      this.companyTest = true;
    }
    if (event === 'subjectFalse') {
      this.subjectTest = false;
    } else if (event === 'subjectTrue') {
      this.subjectTest = true;
    }
    if (event === 'cusFalse') {
      this.cusTest = false;
    } else if (event === 'cusTrue') {
      this.cusTest = true;
    }
    if (this.nameTest && this.emailTest && this.phoneTest && this.companyTest && this.subjectTest && this.cusTest) {
      this.addShow = true;
    } else {
      this.addShow = false;
    }
  }
  colorSelect(color: string): void {
    switch (color) {
      case 'red': {
      this.colorChange = 'rgb(243, 178, 178)';
        break;
      }
      case 'green': {
      this.colorChange = 'rgb(187, 233, 187)';
        break;
      }
      case 'yellow': {
      this.colorChange = 'rgb(250, 250, 176)';
        break;
      }
      case 'blue': {
      this.colorChange = 'rgb(171, 171, 236)';
        break;
      }
      default: {
      this.colorChange = 'rgb(214, 210, 210)';
        break;
      }
    }
  }
  getLocalData(value: string): void {
    if (value === '2018') {
      this.oldMode = true;
      this.addMode = false;
      this.deleteMode = false;
    } else {
      this.oldMode = false;
      this.addMode = true;
    }
    this.localData.getLocalData()
      .subscribe((data: Namez[]) => this.allNameLocal = data);
  }
  gotToHome(): void {
  this.logOut.emit('true');
  }
}
