import { CommonModule } from '@angular/common';
import { Component, effect, input, viewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table'
import { MatTableDataSource } from '@angular/material/table';
@Component({
    selector: 'app-mattable-view',
    imports: [CommonModule, MatTableModule],
    templateUrl: './mattable-view.component.html',
    styleUrl: './mattable-view.component.scss'
})
export class MattableViewComponent {
  dataSource!: any;
  displayedColumns!: any [];
  initColumns!: any[];
  readonly sort = viewChild.required(MatSort);

  data = input.required<any>();
  columns = input.required<any>();
  constructor() {
    effect(() => {
      this.dataSource = this.data();
    });
    effect(() => {
      this.initColumns = this.columns();
      this.displayedColumns = this.initColumns.map(col => col.name);;
    });
  };
}
