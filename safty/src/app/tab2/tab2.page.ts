import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  loading:boolean = true;
  loading1:boolean = true;
  videos:any = [];
  articles:any = [];
  constructor(private iab: InAppBrowser, public  sanitizer:DomSanitizer, private http: HTTP, private router: Router,private storage: Storage,private api: ApiService) {
    this.storage.get('login').then((val) => {

      if(val!=null){

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
      
     
      this.http.get(this.api.api_uri + 'youtubelink', {}, {})
      .then(data => {


        if(data.status == 200){

          this.videos = JSON.parse(data.data);
          console.log(this.videos)
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



  toArticle(id, title){
    this.router.navigate(['article',{id:id, title:title}])
  }








  youtube(e){
   this.iab.create(e ,'_system','location=yes');
  }

}
