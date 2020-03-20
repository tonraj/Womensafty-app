import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  loading:boolean = true;
  title:string = "";
  article:any = [];
  constructor(private route: ActivatedRoute, private launchNavigator: LaunchNavigator, private http: HTTP, private router: Router,private storage: Storage,private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.title = params['title'];

      this.http.get(this.api.api_uri + 'article/' + params['id'] , {}, {}).then((response=>{

        if(response.status == 200){

          this.article = JSON.parse(response.data);
          console.log(this.article)
          this.loading = false;
          

        }else{
          
          this.api.presentToast("Please login again");
          this.router.navigate(['/login']);
        
        }

      }));


    });
  }

}
