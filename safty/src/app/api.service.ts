import { Injectable, Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  api_uri = "http://192.168.1.8:8000";

  constructor(public toastController: ToastController, private http: HttpModule, private nativeStorage: NativeStorage) { 

  }
  


  async presentToast(e:string) {
    const toast = await this.toastController.create({
      message: e,
      duration: 2000
    });
    toast.present();
  }
}
