import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { AddLojaPage } from "../add-loja/add-loja";
import { LojaItem } from "../../models/loja-item/loja-item";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { EditarLojaItemPage } from "../editar-loja-item/editar-loja-item";

@Component({
  selector: 'page-loja-lista',
  templateUrl: 'loja-lista.html',
})
export class LojaListaPage {

  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

 

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private database: AngularFireDatabase,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    this.loading.present();

    this.lojaItemRef$ = this.database.list('loja-lista')

    this.loading.dismiss();
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
            this.navCtrl.push(EditarLojaItemPage,{lojaItemId: lojaItem.$key })
          }
        },
        {
          text: 'Deletar',
          role: 'desctrutive',
          handler: () =>{
            // Deletar item
           this.toastCtrl.create({
              message: `Item ${lojaItem.itemName} Deletado`,
              duration: 3000,
              position: 'bottom'
            }).present();
            this.lojaItemRef$.remove(lojaItem.$key);
            
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
