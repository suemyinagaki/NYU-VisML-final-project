import { Component } from '@angular/core';
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
  public query_result: any[] = [];

  ngAfterViewInit(): void {
    for(let i = 0; i < 100; i++){
      this.query_result.push({
        name: `video-name_${i}`,
        timestamp: i*5874,
        botSort_confidence: i*2635/300000,
        model2_confidence: i*1235/300000,
        number_of_people: i,
        overlapping: i*2
      })
    }
    console.log(this.query_result)
    
  }
}
