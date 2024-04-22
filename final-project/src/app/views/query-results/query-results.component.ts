import { Component, Input, Output, EventEmitter} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-query-results',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    ScrollingModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './query-results.component.html',
  styleUrl: './query-results.component.scss'
})
export class QueryResultsComponent {
  @Input() query_result: any[] = [];
  @Output() newFrameEvent = new EventEmitter<any>();
  public queries: any[] = [];
  public selected: any;
  public color: string = 'white';
  public selected_color: string = 'lightblue';

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: any) {
    for (const propName in changes) {
      const chng = changes[propName];
      this.queries = chng.currentValue;
    }
  }

  public sendFrame(f: any){
    this.selected = f;
    this.newFrameEvent.emit(f);
  }

  public getColor(){
    return this.color;
  }
}
