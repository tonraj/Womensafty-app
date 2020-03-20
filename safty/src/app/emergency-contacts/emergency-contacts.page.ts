import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.page.html',
  styleUrls: ['./emergency-contacts.page.scss'],
})
export class EmergencyContactsPage implements OnInit {


  json:any = [];

  c1 = "";
  c2 = "";
  c3 = "";

  constructor(private http: HTTP, private router: Router,private storage: Storage,private api: ApiService) { }

  ngOnInit() {
    this.storage.get('login').then((val) => {
    var headers = {
      'Authorization': 'Bearer ' + val
    };





    this.http.get(this.api.api_uri + 'addecontact', {}, headers)
    .then(data => {

      if(data.status == 200){
        
         this.json = JSON.parse(data.data);
          this.c1 = this.json['contact1'];
          this.c2 = this.json['contact2'];
          this.c3 = this.json['contact3'];
        
      }
   

   });
  });

  }

  savenumber(a,b,c){


    this.storage.get('login').then((val) => {

      if(val!=null){


    var s = true;

    if(a == null || a.toString().length != 10){
      s = false;
    }
    if(b == null || b.toString().length != 10){
      s = false;
    }
    if(c == null || c.toString().length != 10){
      s = false;
    }

    if(s == false){
      this.api.presentToast("All contact should be 10 digit phone number");
    }else{

      var headers = {
        'Authorization': 'Bearer ' + val
      };


      var payload = {
        'contact1' : a,
        'contact2' : b,
        'contact3' : c,
    }




      this.http.post(this.api.api_uri + 'addecontact', payload, headers)
      .then(data => {

        if(data.status == 200){

          var json = JSON.parse(data.data);
          this.api.presentToast(json['msg']);
        
        }
     

     });

    }
  }});
  }
}
