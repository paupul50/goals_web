import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  imageSources = [this._userService.BACKURL + 'Resources/public_content/home_slideshow/image1.jpg',
    this._userService.BACKURL + 'Resources/public_content/home_slideshow/image2.jpg'];
    imageOne = this._userService.BACKURL + 'Resources/public_content/home_slideshow/image2.jpg';
    imageTwo = '';
    imageThree = this._userService.BACKURL + 'Resources/public_content/home_slideshow/image2.jpg';

  constructor(private _userService: UserService) {
  }

}
