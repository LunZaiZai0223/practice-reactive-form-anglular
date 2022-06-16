import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.component.html',
  styleUrls: ['./value-list.component.css']
})
export class ValueListComponent implements OnInit, OnChanges {
  @Input() childStringifiedList: string = '';

  @Output() onEmittedEditId = new EventEmitter<string>();
  @Output() onEmittedEditIdForDelete = new EventEmitter<string>();

  list : any[] = [];

  constructor() { }

  // sessionStorage 
  ngOnChanges(): void {
    const data = Object.values(sessionStorage).map((item) => JSON.parse(item));
    this.list = data;
  }

  ngOnInit(): void {
  }
  
  onEmitEditId(id: string):void {
    this.onEmittedEditId.emit(id);
  }

  onEmitEditIdForDelete(id: string): void {
    this.onEmittedEditIdForDelete.emit(id);
  }

}
