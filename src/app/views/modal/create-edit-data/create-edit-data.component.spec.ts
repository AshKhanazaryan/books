import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDataComponent } from './create-edit-data.component';

describe('CreateEditDataComponent', () => {
  let component: CreateEditDataComponent;
  let fixture: ComponentFixture<CreateEditDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
