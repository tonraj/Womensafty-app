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

  help_n:number = 0;

  loading1:boolean = true;
  articles:any = [];
  emer : string = "NO";
  

  constructor(private launchNavigator: LaunchNavigator, private http: HTTP, private router: Router,private storage: Storage,private api: ApiService) {

    this.storage.get('login').then((val) => {



      if(val!=null){

        var headers = {
          'Authorization': 'Bearer ' + val
        };



        this.http.get(this.api.api_uri + 'addecontact', {}, headers)
      .then(data => {

      if(data.status == 203){
        this.emer = "NO";
        this.api.presentToast("You have not give emergency contacts, Plese update Emergency contacts");
      }else{
        this.emer = "YES";
      }
     

     });

     


        this.http.get(this.api.api_uri + 'article', {}, {}).then((response=>{

          if(response.status == 200){

            this.articles = JSON.parse(response.data);
            console.log(this.articles)
            this.loading1 = false;
            
  
          }else{
            
            this.api.presentToast("Please login again");
            this.router.navigate(['/login']);
          
          }

        }));

      
      
  
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

  police(){
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    
    this.launchNavigator.navigate('Police Station', options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  hospital(){
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    
    this.launchNavigator.navigate('Hospital', options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  toArticle(id, title){
    this.router.navigate(['article',{id:id, title:title}])
  }

  reset(){

    setTimeout(()=>{
      this.help_n=0;
    },2000)
  }

  help(){

    if(this.help_n == 0){
      this.api.presentToast("Press one more time to send help message");
    }if(this.help_n == 1){
      this.api.presentToast("Sending help message");
    }
   
    this.help_n++;


    this.reset();
    
  }

  emerg(){
    this.router.navigate(['emergency-contacts'])
  }


}