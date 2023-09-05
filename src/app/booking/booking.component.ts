import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { mergeMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configSerice: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomid = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomid, disabled: true },
          { validators: [Validators.required] }
        ),
        guestEmail: ['', [Validators.required, Validators.email]],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: ['', { updateOn: 'blur' }],
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidator.ValidateName,
            CustomValidator.validateSpecialChar('*'),
          ],
        ],
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipCode: [''],
        }),
        guests: this.fb.array([this.addGuestControl()]),
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      },
      { updateOn: 'blur', validators: [CustomValidator.validateDate] }
    );
    // this.getBookingData();

    // this.bookingForm.valueChanges.subscribe(data => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // });

    this.bookingForm.valueChanges
      .pipe(
        mergeMap((data) => this.bookingService.bookRoom(data)) // switchMap or exhaustMap
      )
      .subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    this.bookingService
      .bookRoom(this.bookingForm.getRawValue())
      .subscribe((data) => {
        console.log(data);
      });
  }
  addGuest() {
    this.guests.push(this.addGuestControl());
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      roomId: '2',
      guestEmail: 'kulandai@gmail.com',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '599',
      bookingDate: '',
      mobileNumber: '7887878789',
      guestName: 'kuladai',
      address: {
        addressLine1: 'xxx',
        addressLine2: 'yyy',
        city: '',
        state: '',
        country: '',
        zipCode: '888888',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
