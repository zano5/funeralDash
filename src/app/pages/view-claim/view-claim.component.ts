import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-claim',
  templateUrl: './view-claim.component.html',
  styleUrls: ['./view-claim.component.scss']
})
export class ViewClaimComponent implements OnInit { 
  ClaimentName;
  ID;
  AltNumber;
  Number;
  Date;
  constructor(private db: AngularFirestore,private dialogRef:MatDialogRef<ViewClaimComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.ClaimentName = data.data.data.ClaimentName;
      this.ID = data.data.data.ID;
      this.AltNumber = data.data.data.AltNumber;
      this.Number = data.data.data.Number; 
      this.Date = data.data.data.TimeStamp;
      console.log(data);
    }

  ngOnInit() {
  }
  confirm(){
    this.dialogRef.close();
  }

}
