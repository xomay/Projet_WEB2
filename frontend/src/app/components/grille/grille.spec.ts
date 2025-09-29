import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grille } from './grille';

describe('Grille', () => {
  let component: Grille;
  let fixture: ComponentFixture<Grille>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grille]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Grille);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
