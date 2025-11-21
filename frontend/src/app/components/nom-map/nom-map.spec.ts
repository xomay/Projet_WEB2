import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomMap } from './nom-map';

describe('NomMap', () => {
  let component: NomMap;
  let fixture: ComponentFixture<NomMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
