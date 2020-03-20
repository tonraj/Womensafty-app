import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  loading:boolean = true;

  user:any = {};

  

  constructor(private launchNavigator: LaunchNavigator, private http: HTTP, private router: Router,private storage: Storage,private api: ApiService) {


   
    let options: LaunchNavigatorOptions = {
      app: launchNavigator.APP.GOOGLE_MAPS
    };
    
    this.launchNavigator.navigate('Nearby Police Station', options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );

    this.storage.get('login').then((val) => {

      if(val!=null){
      
      var headers = {
        'Authorization': 'Bearer ' + val
      };
  
      this.http.post(this.api.api_uri + 'getUser', {}, headers)
      .then(data => {


        if(data.status == 200){

          this.user = JSON.parse(data.data).success;
          this.loading = false;

        }else{
          
          this.api.presentToast("Please login again");
          this.router.navigate(['/login']);
        
        }

     });


    }else{

      this.router.navigate(['/login']);
    }



    });
  
  }


  check_emergency(){

  }


}