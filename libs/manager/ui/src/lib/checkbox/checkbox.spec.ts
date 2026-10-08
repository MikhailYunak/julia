import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults to unchecked', () => {
    expect(component.checked()).toBe(false);
  });

  it('emits checkedChange when toggled', () => {
    const emitted: boolean[] = [];
    component.checkedChange.subscribe((value) => emitted.push(value));

    fixture.debugElement
      .query(By.css('button[role="checkbox"]'))
      .nativeElement.click();

    expect(emitted).toEqual([true]);
  });
});
