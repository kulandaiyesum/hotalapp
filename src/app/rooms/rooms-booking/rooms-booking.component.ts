import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;
  // id$ = this.router.params.pipe(map((params) => params['roomid'])); // 3
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid'))); // 4 // most prefered and suitable one
  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    // this.id = this.router.snapshot.params['roomid']; // 2
    // this.router.params.subscribe((params) => {this.id = params['roomid']}); //1 -normal
    // this.router.paramMap.subscribe((params) => params.get('roomid')); //4
  }
}
