import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Namez } from 'src/app/user-data/names';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.scss']
})
export class DeleteComponentComponent implements OnInit {
  @Input() fullDetails: Array<Namez>; // input from parent class
  @Input() editModeValz;
  @Input() displayDeletez: boolean;
  @Output() callBack = new EventEmitter<string>(); // output to parent
  constructor() { }

  ngOnInit() {
  }
  deleteConfirm(): void {
    this.fullDetails.splice(this.editModeValz, 1); // deleting element from array
    this.displayDeletez = false;
    this.callBack.emit('true');
  }
  deleteCancel(): void {
    this.callBack.emit('true'); // output to parent class
    this.displayDeletez = false;
  }
}
