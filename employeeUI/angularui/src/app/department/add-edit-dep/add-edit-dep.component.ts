import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastrService: ToastrService
    ) { }

  @Input() dep: any;
  @Output() sendTrue = new EventEmitter();

  DepartmentId: string;
  DepartmentName: string;
  deparment: any;

  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
  }

  addDepartment() {
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    }
    this.service.addDepartment(val).subscribe(res => {
      this.sendTrue.emit(true);
      this.toastrService.success(res.toString());
    });
  }

  updateDepartment() {
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    }
    this.service.updateDepartment(val).subscribe(res => {
      this.sendTrue.emit(true);
      this.toastrService.success(res.toString());
    });
  }
}
