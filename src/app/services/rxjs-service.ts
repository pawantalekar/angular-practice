import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { PostsI } from "../models/posts.model";

@Injectable({
  providedIn: 'root'
})

export class RxjsService {
private htttp = inject(HttpClient);
  constructor() {
    
   } 


   getPost() : Observable<PostsI[]> {
     return this.htttp.get<any[]>('https://jsonplaceholder.typicode.com/posts')
     .pipe(
       map(posts => posts as PostsI[])
     );
   }
}