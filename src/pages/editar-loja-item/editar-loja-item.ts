import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { LojaItem } from "../../models/loja-item/loja-item";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-editar-loja-item',
  templateUrl: 'editar-loja-item.html',
})
export class EditarLojaItemPage {

  lojaItemSubscription: Subscription; 

  lojaItemRef$: FirebaseObjectObservable<LojaItem>
  lojaItem = {} as LojaItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    
    const lojaItemId = this.navParams.get('lojaItemId');
    console.log(lojaItemId);

    this.lojaItemRef$ = this.database.object(`loja-lista/${lojaItemId}`);

    this.lojaItemSubscription = this.lojaItemRef$.subscribe(lojaItem => this.lojaItem = lojaItem);
    console.log(this.lojaItem);
  }


  onSubmit(){
    this.lojaItemRef$.update(this.lojaItem);
    this.navCtrl.pop();
  }

  ionViewDidLeave() {
    this.lojaItemSubscription.unsubscribe();
  }

}
