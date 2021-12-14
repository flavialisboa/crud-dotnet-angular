import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit  {

  constructor(
    private service: SharedService,
    private toastrService: ToastrService,
    ) { }

  @ViewChild('closeModal') closeModal: ElementRef;

  DepartmentList: any = [];

  ModalTitle: string;
  ActivateAddEditDepComp: boolean = false;
  dep: any;

  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(){
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ""
    }
    this.ModalTitle = "Adicionar Departamento";
    this.ActivateAddEditDepComp = true;
  }

  refreshDepList() {
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
      this.sortResult('DepartmentId', true);
    });
  }

  closeClick() {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  editClick(item) {
    this.dep = item;
    this.ModalTitle = "Editar Departamento";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item) {
    if(confirm('Tem certeza? Esta ação não poderá ser desfeita.')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe(data => {
        this.toastrService.success(data.toString());
        this.refreshDepList();
      })
    }
  }

  FilterFn() {
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el) {
      return el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop, asc) {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a, b) {
      if(asc) {
        return (a[prop] > b[prop])? 1 : ((a[prop] < b[prop]) ?-1 : 0);
      } else {
        return (b[prop] > a[prop])? 1 : ((b[prop] < a[prop]) ?-1 : 0);
      }
    })
  }

  receiveEvent(clicked) {
    if(clicked = true) {
      this.closeModal.nativeElement.click();
    }
  }
}
