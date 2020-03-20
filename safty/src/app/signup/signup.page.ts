import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private storage: Storage, private router: Router, private api: ApiService, private http:HTTP) { }

  ngOnInit() {
  }

  register(form:FormControl){

    var email = form.value.email;
    let name = form.value.name;
    let phone = form.value.phone;
    let password = form.value.password;

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(email);


    let stop = false;

    if(result == false){
      this.api.presentToast("Enter a valid email address");
      stop = true;
    }else if(stop == false && phone.toString().length == 10){

      var payload = {
        'email' : email,
        'password' : password,
        'phone' : phone,
        'name':name,
    }

    console.log(payload);
  
          this.http.post(this.api.api_uri + 'register', payload, {})
            .then(data => {
              
              console.log(data.status);
              
              if(data.status == 200){
                this.api.presentToast("You have been successfully registered, you can login now");
                this.router.navigate(['/login'])

              }else if(data.status == 208){
                this.api.presentToast("Sign up Successfully!");
             
                  var json = JSON.parse(data.data);
                  this.storage.set('login', json['seccess']['token']);
                  this.router.navigate(['/tabs/tab1']);
    
    
                
              }else if(data.status == 500){
                this.api.presentToast("Looks like you are already registered with same email.");
              }
  
            })
            .catch(error => {
  
              console.log(error)
              
            });

    }else{
      this.api.presentToast("Enter 10 digit valid number");
    }

 
  }

}
