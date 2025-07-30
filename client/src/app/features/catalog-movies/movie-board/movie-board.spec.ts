import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBoard } from './movie-board';

describe('MovieBoard', () => {
  let component: MovieBoard;
  let fixture: ComponentFixture<MovieBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
