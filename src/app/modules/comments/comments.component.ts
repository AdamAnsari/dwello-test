import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RedditApiService } from 'src/app/services/reddit-api.service';
import { title } from 'process';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @ViewChild('commentInput') commentInput;
  @ViewChild('replyInput') replyInput;
  subs0: Subscription;
  subs1: Subscription;
  subs2: Subscription;
  subs3: Subscription;
  data: any;
  pathIndex: any;
  displayComment: string;
  replyFlag: boolean = false;
  displayReply: any[] = [];
  parmalink: string;
  resData: any[] = [];
  commentApiData: any[] = [];
  mainComment: string;

  constructor(
    private commS: CommonServiceService,
    private router: Router,
    private redditApiService: RedditApiService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.pathIndex = this.router.getCurrentNavigation().extras.state.id;
      this.parmalink = this.router.getCurrentNavigation().extras.state.parmalink;
    }
  }

  ngOnInit(): void {
    this.subs0 = this.redditApiService
      .getCommentData(this.parmalink)
      .subscribe((res: any) => {
        console.log(res);
        this.resData = [];
        this.commentApiData = [];
        this.resData = { ...res };
        this.resData[1].data.children.forEach((element, index) => {
          if (element.data.body) {
            this.commentApiData.push(element.data.body);
          }
        });
        this.mainComment = this.commentApiData[0];
        this.commentApiData.shift();
        console.log(this.commentApiData);
      });

    this.subs1 = this.commS.postsData.subscribe((res: any) => {
      if (this.pathIndex) {
        this.data = res[this.pathIndex - 1].title;
      } else {
        this.router.navigate(['/posts']);
      }
      console.log(this.data);
    });
  }

  getComments(value) {
    this.commS.getComment(value);
    this.subs2 = this.commS.commentData.subscribe((res: any) => {
      console.log(res);
      if (res.trim().length > 0) {
        this.displayComment = res;
        this.commentInput.nativeElement.value = '';
      }
    });
  }

  getReply(value) {
    this.replyFlag = false;
    this.commS.getReply(value);
    this.subs3 = this.commS.replyData.subscribe((res: any) => {
      console.log(res);
      if (res.trim().length > 0) {
        this.displayReply.push(res);
        this.displayReply = [...new Set(this.displayReply)];
        this.replyInput.nativeElement.value = '';
      }
    });
  }

  openReply() {
    this.replyFlag = true;
  }

  close() {
    this.router.navigate(['/posts']);
  }

  ngOnDestroy() {
    this.subs0?.unsubscribe();
    this.subs1?.unsubscribe();
    this.subs2?.unsubscribe();
    this.subs3?.unsubscribe();
  }
}
