import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  Name;
  ID;
  Email;
  Plan;
  Number;
  Salary;
  UID;
  documentID;
  Members = [];
  data = [];
  constructor(private db: AngularFirestore,private dialogRef:MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.data = data;
      this.Members = data.data.BuyerMembers; 
      this.Name = data.data.BuyerFullName;
      this.Email = data.data.BuyerEmail;
      this.ID = data.data.BuyerID;
      this.Plan = data.data.BuyerPolicy;
      this.Number = data.data.BuyerMobileNumber;
      this.Salary = data.data.BuyerIncome;
      this.UID = data.id; 
      this.documentID = data.data.BuyerUserID;

    }

  ngOnInit() {
  }
  close() { 
    this.dialogRef.close();
    
  }
  Confirm(){
      this.db.collection('users').doc(this.documentID).set({
      displayName: this.Name,
      email: this.Email,
      id: this.ID,
      userid: this.UID,
      plan:this.Plan,
      members:this.Members.length
     }).catch(error=>{
       alert(error.message)
     })
    this.db.collection('Approved Purchases').add(this.data);
    this.db.collection('Purchase').doc(this.UID).delete(); 
    this.dialogRef.close();
  }

}
