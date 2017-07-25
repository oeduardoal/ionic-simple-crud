import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddLojaPage } from "../add-loja/add-loja";
import { LojaItem } from "../../models/loja-item/loja-item";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'page-loja-lista',
  templateUrl: 'loja-lista.html',
})
export class LojaListaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private database: AngularFireDatabase) {
    this.lojaItemRef$ = this.database.list('loja-lista')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LojaListaPage');
  }

    lojaItemRef$: FirebaseListObservable<LojaItem[]>

  selectLojaItem(lojaItem: LojaItem){
    // Mostrar Action Sheet para perguntar o que deseja fazer

    // 1. Edit
    // 2. Delete
    // 3. Cancelar
    this.actionSheetCtrl.create({
      title: `${lojaItem.itemName}`,
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            // Abrir página de Editar e mandar o item como parametro
          }
        },
        {
          text: 'Deletar',
          role: 'desctrutive',
          handler: () =>{
            // Deletar item
            this.lojaItemRef$.remove(lojaItem.$key)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    }).present();
  }

  navToAddLojaPage(){
    // Navegar para AddLojaPage (Um Componente) - Não esquecer de importar
    this.navCtrl.push(AddLojaPage)
  }
}
