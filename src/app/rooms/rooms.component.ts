import { RoomsService } from './services/rooms.service';
import { HeaderComponent } from './../header/header.component';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType, HttpRequest } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotalName = 'Hilton Hotel'; // it is "interpiolation"

  numberOfRooms = 10; // number of rooms - here im using "property binding"

  hideRooms = false;

  title = 'Room List';

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    avalableRooms: 10,
    bookedRooms: 5,
  };

  roomList: RoomList[] = [];

  totalBytes = 0;

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });
  subscribtion!: Subscription;

  error$: Subject<string> = new Subject<string>();

  getError$ = this.error$.asObservable();
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter  = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms)=> rooms.length)
  )

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;
  constructor(private roomsService: RoomsService, private configService: ConfigService) {}

  ngAfterViewChecked(): void {
    // throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    this.headerComponent.title = 'Room views';
    console.log((this.headerChildrenComponent.last.title = 'Last title'));

    // throw new Error('Method not implemented.');
  }
  ngDoCheck(): void {
    console.log('do check method is implemented');
  }

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes = event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe((data) => console.log(data, 'stream'));
    // this.subscribtion = this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    // console.log(room);
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'ultra ultra dulexe Room',
      amenities: 'ac,free wifi devices, TV, Bathroom,kitchen',
      price: 2000,
      photos: 'https://unsplash.com/photos/JoyGJvNdhPE',
      checkinTime: new Date('13-jan-2023'),
      checkoutTime: new Date('17-jan-2023'),
      rating: 4.3,
    };
    // this.roomList.push(room); insted of this use bellow that

    // where we have to consider immutability ffcv(5:25 mins)

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'ultra ultra dulexe Room',
      amenities: 'ac,free wifi devices, TV, Bathroom,kitchen',
      price: 2000,
      photos: 'https://unsplash.com/photos/JoyGJvNdhPE',
      checkinTime: new Date('13-jan-2023'),
      checkoutTime: new Date('17-jan-2023'),
      rating: 4.3,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}
