import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Home Page
import { LojaListaPage } from "../pages/loja-lista/loja-lista";

import { AddLojaPage } from "../pages/add-loja/add-loja";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

// Config Firebase
import { FIREBASE_CONFIG } from "./firebase.credentials";
@NgModule({
  declarations: [
    MyApp,
    LojaListaPage,
    AddLojaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Inicializar AngularFire com as credenciais
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    // Importar o AngularFireDatabaseModule para as interações
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LojaListaPage,
    AddLojaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
