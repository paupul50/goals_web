import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../Services/comment/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {

  @Input() commentTargetId: number;
  @Input() commentTarget: string;
  @Output() commentCreated: EventEmitter<any>;
  form: FormGroup;

  formSubmited: boolean;
  changeReceived: boolean;
  submitLoading: boolean;
  constructor(private fb: FormBuilder, private _commentService: CommentService) {
    this.addControls();
    this.commentCreated = new EventEmitter();

  }

  addControls() {
    this.form = this.fb.group({
      'body': ['', Validators.required]
    });
  }

  onSubmit() {
    this.formSubmited = true;

    if (this.form.valid) {
      this._commentService.addComment(this.form.value.body,
         this.commentTarget, this.commentTargetId).subscribe((comment: any) => {
        this.commentCreated.emit(comment);
        this.form.reset();
      });
    }

  }
}
