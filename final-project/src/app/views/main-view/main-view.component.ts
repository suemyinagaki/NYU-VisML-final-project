import { Component, Input} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule,
    MatRadioModule
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  @Input() current_frame: any[] = [];
  public frame_slider: number = 1;
  public max_frame: number = 3;
  public displayMode: string = "bot";
  // public img_index: string = this.frame_slider.toString().padStart(6, "0");
  // public image_source: string = `../../../assets/frames/img1/${this.img_index}.png`

  
  ngOnChanges(changes: any) {
    for (const propName in changes) {
      const chng = changes[propName];
      this.current_frame = chng.currentValue;
    }
  }

  ngAfterViewInit(){
    this.max_frame = 450;
  }


}
