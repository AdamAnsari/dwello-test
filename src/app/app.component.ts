import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { CommonServiceService } from './services/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Reddit Clone';
  status = 'ONLINE';
  isConnected = true;

  constructor(
    private router: Router,
    private connectionService: ConnectionService,
    private commS: CommonServiceService
  ) {
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        alert('Internet Connected');
        window.location.reload();
        this.status = 'ONLINE';
      } else {
        alert('Internet Disconnected');
        this.status = 'OFFLINE';
      }
    });
    if (window.location.pathname === '/') {
      this.router.navigate(['/posts']);
    }
  }

  ngOnInit() {}
}
