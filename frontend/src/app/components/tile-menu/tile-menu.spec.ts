import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMenu } from './tile-menu';

describe('TileMenu', () => {
  let component: TileMenu;
  let fixture: ComponentFixture<TileMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
