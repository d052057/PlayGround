import { CommonModule } from '@angular/common';
import { Component, effect, input, output} from '@angular/core';

@Component({
    selector: 'app-grid-video',
    imports: [CommonModule],
    templateUrl: './grid-video.component.html',
    styleUrl: './grid-video.component.scss'
})
export class GridVideoComponent {
  dataSource!: any;
  constructor() {
    effect(() => {
      this.dataSource = this.videoList();
    });
  }
  videoList = input.required<any>();

  serieSelectedEvent = output<any>();
  /*outputFromObservable*/
  selectSeries(val: any) {
    this.serieSelectedEvent.emit(val);
  }
}
