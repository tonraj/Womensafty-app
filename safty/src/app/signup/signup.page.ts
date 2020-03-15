import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router, private api: ApiService, private http:HTTP) { }

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
  
          this.http.post(this.api.api_uri + '/api/register', payload, {})
            .then(data => {
              
              console.log(data.status);
              
              if(data.status == 200){
                this.api.presentToast("You have been successfully registered, you can login now");
                this.router.navigate(['/login'])

              }else if(data.status == 208){
                this.api.presentToast(JSON.parse(data.data)['msg']);
              }
  
            })
            .catch(error => {
  
              
            });

    }else{
      this.api.presentToast("Enter 10 digit valid number");
    }

 
  }

}
