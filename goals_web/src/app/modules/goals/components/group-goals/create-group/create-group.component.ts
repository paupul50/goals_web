import { GroupService } from '../../../services/group/group.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  groupNameForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _groupService: GroupService, private _router: Router) { }

  ngOnInit() {
    this.groupNameForm = this._formBuilder.group({
      groupNameControl: ['', Validators.required]
    });
  }

  submit(): void {
    this._groupService.createGroup(this.groupNameForm.value.groupNameControl)
      .subscribe(anything => this._router.navigate(['/goals/group']));
  }

}
