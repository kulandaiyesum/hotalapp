import { map, pluck } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comments } from './comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  // comments$ = this.commentService.getComments();  //2

  comment$ = this.activatedRoute.data.pipe(pluck('comments')); //1 using resolver

  comments: Comments[] = [];

  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(   //3
    //   (data) => (this.comments = data['comments'])
    // );
  }
}
