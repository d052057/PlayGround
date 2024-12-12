import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { AngMusicPlayerComponent } from './ang-music-player.component';

describe('AngMusicPlayerComponent', () => {
  let component: AngMusicPlayerComponent;
  let fixture: ComponentFixture<AngMusicPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AngMusicPlayerComponent]
})
    .compileComponents();
    fixture = TestBed.createComponent(AngMusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
