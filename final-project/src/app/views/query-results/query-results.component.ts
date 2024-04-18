import { Component, Input } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-query-results',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    ScrollingModule
  ],
  templateUrl: './query-results.component.html',
  styleUrl: './query-results.component.scss'
})
export class QueryResultsComponent {
  @Input() query_result: any[] = [];
  public queries: any[] = [];

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: any) {
    console.log(changes);
    for (const propName in changes) {
      const chng = changes[propName];
      this.queries = chng.currentValue;
    }
  }
}
