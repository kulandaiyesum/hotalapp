import { Component, OnInit } from '@angular/core';
import { Room, RoomList } from './rooms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  hotalName = 'Hilton Hotel'; // it is "interpiolation"

  numberOfRooms = 10; // number of rooms - here im using "property binding"

  hideRooms = false;

  rooms: Room = {
    totalRooms: 20,
    avalableRooms: 10,
    bookedRooms: 5,
  };

  roomList: RoomList[] = [
    {
      roomNumber: 1,
      roomType: 'dulexe Room',
      amenities: 'ac,free wifi devices, TV, Bathroom,kitchen',
      price: 500,
      photos: 'https://unsplash.com/photos/JoyGJvNdhPE',
      checkinTime: new Date('10-jan-2023'),
      checkoutTime: new Date('11-jan-2023'),
    },
    {
      roomNumber: 2,
      roomType: 'ultra dulexe Room',
      amenities: 'ac,free wifi devices, TV, Bathroom,kitchen',
      price: 1000,
      photos: 'https://unsplash.com/photos/JoyGJvNdhPE',
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),
    },
    {
      roomNumber: 3,
      roomType: 'ultra dulexe Room',
      amenities: 'ac,free wifi devices, TV, Bathroom,kitchen',
      price: 1500,
      photos: 'https://unsplash.com/photos/JoyGJvNdhPE',
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.hideRooms = !this.hideRooms;
  }
}
