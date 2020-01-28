import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-confirm2',
  templateUrl: './confirm2.component.html',
  styleUrls: ['./confirm2.component.scss']
})
export class Confirm2Component implements OnInit {
  Name;
 ClaimentName;
  ID;
  AltNumber;
  Number;
  UID;

  data = [];
  constructor(private db: AngularFirestore,private dialogRef:MatDialogRef<Confirm2Component>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.data = data;
      console.log(this.data);
      this.ClaimentName = data.data.ClaimentName;
      this.ID = data.data.ID;
      this.AltNumber = data.data.AltNumber;
      this.Number = data.data.Number;
      this.UID = data.id; 
    }


  ngOnInit() {
  }
  close() { 
    this.dialogRef.close();
    
  }
  Confirm(){
      this.db.collection('users').doc(this.UID).set({
      displayName: this.Name,
      id: this.ID,
      userid: this.UID,
     
     }).catch(error=>{
       alert(error.message)
     })
    this.db.collection('claims doc').add(this.data);
    this.db.collection('claims doc').doc(this.UID).delete(); 
    this.dialogRef.close();
  }

}
