import { InitService } from './init.service';
import { RoomsComponent } from './rooms/rooms.component';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ElementRef,
  Optional,
  Inject,
} from '@angular/core';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotelapp';
  role = 'Admin';
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('name', { static: true }) name!: ElementRef;
  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private route: Router
  ) {
    console.log(initService.config);
  }
  ngOnInit(): void {
    // this.route.events.subscribe((event) => {
    //   console.log(event);
    // });

    this.route.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log("navigation start");
      });

      this.route.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          console.log('navigation End');
        });

    this.name.nativeElement.innerText = 'Hilton Hotel';
    this.loggerService?.Log('AppComponent.ngOninit()');
    this.localStorage.setItem('name', 'Hilton Hotel');
  }
  // ngAfterViewInit() {

  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
