import { InjectionToken } from "@angular/core";

export const LocalStorageToken = new InjectionToken<any>('LocalStorage',{
  providedIn: 'root',
  factory() {
      return localStorage;
  },
});