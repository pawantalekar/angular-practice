import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter, from, map, mergeMap, of, Subject, tap } from 'rxjs';
import { RxjsService } from '../services/rxjs-service';
import { PostsI } from '../models/posts.model';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../highlight.directive';


@Component({
  selector: 'app-rxjs-practice-component',
  imports: [FormsModule, CommonModule, HighlightDirective],
  templateUrl: './rxjs-practice-component.html',
  styleUrl: './rxjs-practice-component.css',
})

export class RxjsPracticeComponent {


  private rxjsService = inject(RxjsService);
  myName$ = new Subject<string>();

  nums$ = from([1, 2, 3, 4, 5]);
  numsOf$ = of([10, 20, 30, 40, 50]);

  posts: PostsI[] = [];
  constructor() {
    // this.myName$.subscribe(name => {

    //   console.log(`Hello, ${name}!`);
    // });
    // this.myName$.next(' Pawan ');

    // this.nums$.pipe(
    //   filter(num => num % 2 === 0)
    // ). 
    // subscribe((num: any) => {

    //   console.log(`Number: ${num}`);
    // });


    //numsOf$ with mergeMap

    // this.numsOf$.pipe( 

    //   mergeMap(nums => nums),

    //   filter((num : any) => num % 2 == 0)

    // ).subscribe((num : any)=>
    // {
    //   console.log(num);
    // })

    //map 
    // this.numsOf$.pipe(
    //   mergeMap(nums => nums),
    //   map((nums:any) => nums * 2)
    // ).subscribe((num : any)=> {
    //   console.log(num);
    // })


    //tap 

    // this.nums$.pipe(

    //   tap((nums => console.log('Before Map: ', nums))),
    //   map((nums:any) => nums * 3),
    //   tap((nums => console.log('After Map: ', nums))),
    // ).subscribe((num : any)=> {
    //   console.log(num); 
    //   })


    //service call 


    this.rxjsService.getPost().subscribe((posts: any) => {
      this.posts = posts;
      console.log(this.posts);
    });

  }
  trackById(index: number, item: any): any {
    return item.id;
  }
}
