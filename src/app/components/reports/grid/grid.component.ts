import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-charts-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      // For smaller screens, make charts to fill 2 cols, 1 row making a single column of charts
      if (matches) {
        return [
          { title: 'Chart 1', cols: 2, rows: 1 },
          { title: 'Chart 2', cols: 2, rows: 1 },
          { title: 'Chart 3', cols: 2, rows: 1 },
          { title: 'Chart 4', cols: 2, rows: 1 }
        ];
      }
      // Bigger screens will display 2x2 grid of charts
      return [
        { title: 'Chart 1', cols: 1, rows: 1 },
        { title: 'Chart 2', cols: 1, rows: 1 },
        { title: 'Chart 3', cols: 1, rows: 1 },
        { title: 'Chart 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
