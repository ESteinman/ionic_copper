import { MyApp } from './app.component'
import { TestBed, async, inject } from '@angular/core/testing'
import { IonicModule, Platform } from 'ionic-angular';
import { PlatformMock, StatusBarMock, SplashScreenMock } from 'ionic-mocks'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, BaseRequestOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Angular2TokenService } from 'angular2-token';

describe ('AppComponent', () => {
    let fixture, component;

    let signInData = {
        email: 'test@test.com',
        password: 'password',
        userType: String
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            imports: [
                IonicModule.forRoot(MyApp)
            ],
            providers: [
                { provide: Platform, useFactory: () => PlatformMock.instance() },
                { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
                { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() }
            ]
        })

        fixture = TestBed.createComponent(MyApp);
        component = fixture.componentInstance;
    })

    it('should create the app', () => {
        expect(component).toBeTruthy();
        expect(component instanceof MyApp).toEqual(true);
    });
})
