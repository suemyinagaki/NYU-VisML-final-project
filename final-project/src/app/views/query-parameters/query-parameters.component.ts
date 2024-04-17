import { Component } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';

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
    MatTooltipModule
  ],
  templateUrl: './query-parameters.component.html',
  styleUrl: './query-parameters.component.scss'
})
export class QueryParametersComponent {
  public value: number = 0;
}
