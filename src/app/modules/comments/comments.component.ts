import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @ViewChild('commentInput') commentInput;
  @ViewChild('replyInput') replyInput;
  subs1: Subscription;
  subs2: Subscription;
  subs3: Subscription;
  data: any;
  pathIndex: any;
  displayComment: string;
  replyFlag: boolean = false;
  displayReply: any[] = [];

  constructor(private commS: CommonServiceService, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.pathIndex = this.router.getCurrentNavigation().extras.state.example;
    }
  }

  ngOnInit(): void {
    this.subs1 = this.commS.postsData.subscribe((res) => {
      if (this.pathIndex) {
        this.data = res[this.pathIndex - 1];
      } else {
        this.router.navigate(['/posts']);
      }
      console.log(this.data);
    });
  }

  getComments(value) {
    this.commS.getComment(value);
    this.subs2 = this.commS.commentData.subscribe((res) => {
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
    this.subs3 = this.commS.replyData.subscribe((res) => {
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
    this.subs1?.unsubscribe();
    this.subs2?.unsubscribe();
    this.subs3?.unsubscribe();
  }
}
