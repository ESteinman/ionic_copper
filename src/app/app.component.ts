import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Angular2TokenOptions, Angular2TokenService } from 'angular2-token';

import { PersonProvider } from '../providers/person/person'
import { PerformanceDataProvider } from '../providers/performance-data/performance-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  currentUser: any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private _tokenService: Angular2TokenService,
    public person: PersonProvider,
    public performanceData: PerformanceDataProvider,
    private alertCtrl: AlertController
  ) {
      this._tokenService.init({
        apiBase: 'https://es-cooper-api.herokuapp.com/api/v1'
      });
    
      this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];

  }

  calculate(user) {
    this.person.age = user.age;
    this.person.gender = user.gender;
    this.person.doAssessment(user.distance);
    this.performanceData
      .saveData({ performance_data: { data: { message: this.person.assessmentMessage} } })
      .subscribe(data => console.log(data));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  loginPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
        .subscribe(
          res => (this.currentUser = res.json().data),
          err => console.error('error')
        );
  }

  logOut() {
    this._tokenService
      .signOut()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
  }

  update() {
    this._tokenService
    .updatePassword({
      password:             'newPassword',
      passwordConfirmation: 'newPassword',
      passwordCurrent:      'oldPassword',
      resetPasswordToken:   'resetPasswordToken',
  }).subscribe(
      res =>      console.log(res),
      error =>    console.log('error')
  );
  }

  create() {
    this._tokenService.registerAccount({
      email:                'example@example.org',
      password:             'secretPassword',
      passwordConfirmation: 'secretPassword'
  }).subscribe(
      res =>      console.log(res),
      error =>    console.log('error')
  );
  }
}
