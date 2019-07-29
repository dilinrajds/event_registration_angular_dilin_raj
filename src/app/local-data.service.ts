import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {

  constructor(private http: HttpClient) { }

  getLocalData() {
    return this.http.get('assets/localData.json');
  }
  getPasswordData() {
    return this.http.get('assets/password.json');
  }
}
