import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  public postsData = new BehaviorSubject<string>(undefined);
  public commentData = new BehaviorSubject<string>(undefined);
  public replyData = new BehaviorSubject<string>(undefined);

  constructor() {}

  getPostData(data) {
    this.postsData.next(data);
  }

  getComment(data) {
    this.commentData.next(data);
  }

  getReply(data) {
    this.replyData.next(data);
  }
}
