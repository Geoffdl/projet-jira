import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: { params: {} },
            params: { subscribe: () => {} },
        };

        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have the 'simple-template-lts' title`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('simple-template-lts');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('app-navbar')).toBeTruthy();
    });
});
