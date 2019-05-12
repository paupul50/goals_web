import { GroupHttpService } from '../../../services/group/group-http.service';
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

  constructor(private _formBuilder: FormBuilder,
    private _groupHttpService: GroupHttpService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.groupNameForm = this._formBuilder.group({
      groupNameControl: ['', Validators.required]
    });
  }

  submit(): void {
    this._groupHttpService.createGroup(this.groupNameForm.value.groupNameControl)
      .subscribe(() => this._router.navigate(['/goals/group']));
  }
}
