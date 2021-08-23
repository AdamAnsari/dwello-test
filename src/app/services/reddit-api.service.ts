import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RedditApiService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('https://www.reddit.com/.json');
  }

  getCommentData(data) {
    return this.http.get(`https://www.reddit.com/${data}/.json`);
  }
}
