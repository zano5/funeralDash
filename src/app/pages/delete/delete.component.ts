import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit { 
 ClaimentName;
  ID;
  AltNumber;
  Number;
  UID;

  data = [];
  constructor(private db: AngularFirestore,private dialogRef:MatDialogRef<DeleteComponent>,
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
  close1() { 
    this.dialogRef.close();
    
  }
  Confirm1(){ 
    this.db.collection('Rejected Claims').add(this.data);
    this.db.collection('claims doc').doc(this.UID).delete();  
    this.dialogRef.close();
  }
}
