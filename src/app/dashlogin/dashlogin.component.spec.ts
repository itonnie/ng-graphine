import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashloginComponent } from './dashlogin.component';

describe('DashloginComponent', () => {
  let component: DashloginComponent;
  let fixture: ComponentFixture<DashloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
