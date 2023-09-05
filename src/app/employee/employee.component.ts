import { RoomsService } from './../rooms/services/rooms.service';
import { Component, OnInit, Self } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // providers: [RoomsService],
})
export class EmployeeComponent implements OnInit {
  empName: string = 'Jhon';
  constructor( private roomsService: RoomsService) {}

  ngOnInit(): void {}
}
