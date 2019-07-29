import { Directive, Input, OnInit, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appErrorhighlighter]'
})
export class ErrorhighlighterDirective implements OnInit {

  @Input() name = '';
  @Input() email = '';
  @Input() phone = '';
  @Input() company = '';
  @Input() subject = '';
  @Input() cus = '';
  @Input() addShow = false;
  @Output() callBackError = new EventEmitter<string>();
  // tslint:disable-next-line:max-line-length
  regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  regexpePhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  ngOnInit(): void {
  }
  constructor(private el: ElementRef) { }
  @HostListener('blur') blurEvent() {
    this.onBlur();
  }
  onBlur() {
    const emailValidate = this.regexpEmail.test(this.email);
    const phoneValidate = this.regexpePhone.test(this.phone);
    if ((this.name.trim().length) === 0 && this.el.nativeElement.id === 'name') {
      this.el.nativeElement.style.borderColor = 'rgb(209, 101, 101)';
      this.callBackError.emit('nameFalse');
    } else if ((this.name.trim().length) !== 0 && this.el.nativeElement.id === 'name') {
      this.el.nativeElement.style.borderColor = 'rgb(184, 177, 177)';
      this.callBackError.emit('nameTrue');
    }
    if (!emailValidate && this.el.nativeElement.id === 'email') {
      this.el.nativeElement.style.borderColor = 'rgb(209, 101, 101)';
      this.callBackError.emit('emailFalse');
    } else if (emailValidate && this.el.nativeElement.id === 'email') {
      this.el.nativeElement.style.borderColor = 'rgb(184, 177, 177)';
      this.callBackError.emit('emailTrue');
    }
    if (!phoneValidate && this.el.nativeElement.id === 'phone') {
      this.el.nativeElement.style.borderColor = 'rgb(209, 101, 101)';
      this.callBackError.emit('phoneFalse');
    } else if (phoneValidate && this.el.nativeElement.id === 'phone') {
      this.el.nativeElement.style.borderColor = 'rgb(184, 177, 177)';
      this.callBackError.emit('phoneTrue');
    }
    if ((this.subject.trim().length) === 0 && this.el.nativeElement.id === 'subject') {
      this.el.nativeElement.style.borderColor = 'rgb(209, 101, 101)';
      this.callBackError.emit('subjectFalse');
    } else if ((this.subject.trim().length) !== 0 && this.el.nativeElement.id === 'subject') {
      this.el.nativeElement.style.borderColor = 'rgb(184, 177, 177)';
      this.callBackError.emit('subjectTrue');
    }
    if ((this.company.trim().length) === 0 && this.el.nativeElement.id === 'company') {
      this.el.nativeElement.style.borderColor = 'rgb(209, 101, 101)';
      this.callBackError.emit('companyFalse');
    } else if ((this.company.trim().length) !== 0 && this.el.nativeElement.id === 'company') {
      this.el.nativeElement.style.borderColor = 'rgb(184, 177, 177)';
      this.callBackError.emit('companyTrue');
    }
    if ((this.cus.trim().length) === 0 && this.el.nativeElement.id === 'cus') {
      this.el.nativeElement.style.borderColor = 'rgb(209, 101, 101)';
      this.callBackError.emit('cusFalse');
    } else if ((this.cus.trim().length) !== 0 && this.el.nativeElement.id === 'cus') {
      this.el.nativeElement.style.borderColor = 'rgb(184, 177, 177)';
      this.callBackError.emit('cusTrue');
    }
  }
}
