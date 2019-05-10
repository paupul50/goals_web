import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoadingBarService } from '../../services/loading-bar/loading-bar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoading = false;
  constructor(
    public userService: UserService,
    private _loadingBarService: LoadingBarService
  ) { }

  ngOnInit() {
    this._loadingBarService.getIsLoadingObservable().subscribe(isLoading => this.isLoading = isLoading);
  }

  logout(): void {
    this.userService.logout();
  }

}
