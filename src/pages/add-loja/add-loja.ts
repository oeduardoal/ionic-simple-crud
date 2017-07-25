import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LojaItem } from "../../models/loja-item/loja-item";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'page-add-loja',
  templateUrl: 'add-loja.html',
})
export class AddLojaPage {


  // Criando o objeto baseado na interface dele
  lojaItem = {} as LojaItem;

  lojaItemRef$: FirebaseListObservable<LojaItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.lojaItemRef$ = this.database.list('loja-lista');

    /*
      loja-list:
        0:
          itemName: 'Pizza'
          itemDesc: 'loremloremloremlorem'
        1:
          itemName: 'Choco'
          itemDesc: 'loremloremloremlorem'
    */
    
  }

  AddLojaItem(lojaItem: LojaItem){

    // Criando um objeto, onde eu posso trata-lo e depois envio para o firebase
    this.lojaItemRef$.push({
      itemName: this.lojaItem.itemName,
      itemDesc: this.lojaItem.itemDesc,
    })

    this.lojaItem = {} as LojaItem;

    this.navCtrl.pop();
  }
}
