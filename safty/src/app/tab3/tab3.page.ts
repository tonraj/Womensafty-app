import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  loading:boolean = true;

  user:any = {};
  contacts:any = {};

  emer:string = "NO";

  constructor(private http: HTTP, private router: Router,private storage: Storage,private api: ApiService) {
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
        
        this.contacts = JSON.parse(data.data);
      }

     
     

     });
  
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

}
