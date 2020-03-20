import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(private storage: Storage, private nativeStorage: NativeStorage, private router: Router, private api: ApiService, private http:HTTP) { }

  ngOnInit() {

  }

  login(){

          var payload = {
            'email' : this.username,
            'password' : this.password,
        }

       

        this.http.post(this.api.api_uri + 'login', payload, {})
          .then(data => {

            
            
            if(data.status == 200){
              var json = JSON.parse(data.data);

              this.storage.set('login', json['success']['token']);

              this.router.navigateByUrl('/tabs/tab1');

              
            }

          })
          .catch(error => {
         
            if(error.status == 401 ){
              this.api.presentToast("Wrong email or password!");
            }
          });
 
        }

  register(){

  }

}
