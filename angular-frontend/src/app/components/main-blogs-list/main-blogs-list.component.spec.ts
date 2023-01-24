import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlogsListComponent } from './main-blogs-list.component';

describe('MainBlogsListComponent', () => {
  let component: MainBlogsListComponent;
  let fixture: ComponentFixture<MainBlogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBlogsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBlogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
