import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(private nativeStorage: NativeStorage, private router: Router, private api: ApiService, private http:HTTP) { }

  ngOnInit() {
    this.nativeStorage.setItem('login', {property: "das"});
  }

  login(){
    var payload = {
      'email' : this.username,
      'password' : this.password,
  }

        this.http.post(this.api.api_uri + '/api/login', payload, {})
          .then(data => {
            
            if(data.status == 200){
              var json = JSON.parse(data.data);
              this.nativeStorage.setItem('login', {property: json['token']})
              .then(
                () =>{
                  this.router.navigate(['/tabs/tab1']);
                },
                error => console.error('Error storing item', error)
              );


            }

          })
          .catch(error => {

            
          });
  }

  register(){

  }

}
