import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {

  User = {
    key: '',
    displayName: '',
    id: '',
    email: '',
    plan: '',
}
userRef;
users = [];
  constructor(private route:ActivatedRoute, private db: AngularFirestore) {
  }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      console.log(params)

      this.User.key = params.key
      console.log(this.User.key)
 
        this.db.collection('users').snapshotChanges().subscribe(data => {
          this.users = data.map(e => {
            return{
              key: e.payload.doc.id,
              ...e.payload.doc.data()
            } 
          });
          this.users.forEach(element => {
            if (this.User.key == element.key) {
              this.User.displayName = element.displayName;
              this.User.id = element.id;
              this.User.email = element.email;
              this.User.plan = element.plan;
            }
          }); 
        })
      
    })
    
  }

}
