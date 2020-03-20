import { Injectable, Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';
import {HttpModule} from '@angular/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  api_uri = "http://192.168.1.8:8000/api/v1/";

  constructor(private storage: Storage, public toastController: ToastController, private http: HTTP) { 

  }


  check_str(){
  
    return new Promise(function(resolve, reject) {
      
      this.storage.get('login').then((val) => resolve(val))
  
    });
  
  }


  check_login (){


    return new Promise(function(resolve, reject) {


      var headers = {
         'Authorization': 'Bearer ' + this.token
       };
 
      

    this.check_str().then((val) => {

      if(val!=null){
        this.http.post(this.api.api_uri + 'login', {}, {})
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error)
        });
      }

    })

    
    }
    );

  }

  


  async presentToast(e:string) {
    const toast = await this.toastController.create({
      message: e,
      duration: 2000
    });
    toast.present();
  }
}
