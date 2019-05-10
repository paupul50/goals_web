import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentHttpService } from '../Services/comment/comment-http.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {
  @Input() commentedUser: string;
  @Input() commentTarget: string;
  @Output() commentCreated: EventEmitter<any>;

  form: FormGroup;
  formSubmited: boolean;
  changeReceived: boolean;
  submitLoading: boolean;

  constructor(private fb: FormBuilder, private _commentHttpService: CommentHttpService) {
    this.addControls();
    this.commentCreated = new EventEmitter();
  }

  addControls(): void {
    this.form = this.fb.group({
      'body': ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.formSubmited = true;
    if (this.form.valid) {
      this._commentHttpService.addComment(this.form.value.body,
        this.commentTarget, this.commentedUser).subscribe((comment: any) => {
          this.commentCreated.emit(comment);
          this.form.reset();
        });
    }
  }
}
