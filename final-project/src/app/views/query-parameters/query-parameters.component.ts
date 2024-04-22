import { Component } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-query-parameters',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatSliderModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './query-parameters.component.html',
  styleUrl: './query-parameters.component.scss'
})
export class QueryParametersComponent {

  @Output() newItemEvent = new EventEmitter<any[]>();

  public overlap_area: number = 0;
  public people_scene: number = 0;
  public bot_confidence: number = 0.0;
  public byte_confidence: number = 0.0;
  public sort_by: string = "area";
  private mock_data: any[] = [];
  public result: any[] = [];


  ngAfterViewInit(){
    for (let i = 0; i < 300; i++) {
      const obj = {
        area: Math.floor(Math.random() * 11),
        people: Math.floor(Math.random() * 11),
        bot_conf: parseFloat(Math.random().toFixed(1)),
        byte_conf: parseFloat(Math.random().toFixed(1)),
        video: `video ${Math.floor(Math.random() * 5)}`,
        frame: `video ${Math.floor(Math.random() * 500)}`,
      };
      this.mock_data.push(obj);
    }
  }

  public clearParameters(){
    this.overlap_area = 0;
    this.people_scene = 0;
    this.bot_confidence = 0.0;
    this.byte_confidence = 0.0;
    this.sort_by = "area";
  }
  public query(){
    this.result = [];
    this.mock_data.forEach((frame: any) => {
      if(frame.area >= this.overlap_area && frame.people >= this.people_scene && frame.bot_conf >= this.bot_confidence && frame.byte_conf >= this.byte_confidence){
        this.result.push(frame);
      }
    });
    if (this.sort_by === 'area'){
      this.result.sort((a, b) => -a.area + b.area);
    }else if(this.sort_by === 'people'){
      this.result.sort((a, b) => -a.people + b.people);
    }else if(this.sort_by === 'bot'){
      this.result.sort((a, b) => a.bot_conf - b.bot_conf);
    }else{
      this.result.sort((a, b) => a.byte_conf - b.byte_conf);
    }
    this.newItemEvent.emit(this.result);
  }
}
