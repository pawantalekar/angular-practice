import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private baseUrl = 'https://localhost:7140/api/Student';


  constructor(private http: HttpClient) { }


getStudents(){
  return this.http.get<any[]>(`${this.baseUrl}`);
}

}
