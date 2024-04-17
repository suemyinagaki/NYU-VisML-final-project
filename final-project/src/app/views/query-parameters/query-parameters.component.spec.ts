import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryParametersComponent } from './query-parameters.component';

describe('QueryParametersComponent', () => {
  let component: QueryParametersComponent;
  let fixture: ComponentFixture<QueryParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
