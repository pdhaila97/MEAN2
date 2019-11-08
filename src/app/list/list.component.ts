import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MembersService } from '../members.service';
import { Member } from '../member';
import {  } from 'events';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private membersService:MembersService, private router: Router) { }
  members;
  currentPage;
  firstElementOnPage;
  lastElementOnPage;
  ngOnInit() {
    if(!this.currentPage){
      this.currentPage = 1;
      this.firstElementOnPage = 1;
      this.lastElementOnPage = this.membersService.skips;
    }
    this.getAll();
  }
  @Output() messageToSend = new EventEmitter<any>();
  populateInputs(member:Member){
    let key = member._id;
    this.membersService.populateInputs(key).then(
      (res) => {
        this.router.navigate(['/update', key]);
        let updatedDisplayJson = {memberAdded: false, regPageDisplay: true, addBtnCtrl: false};
        this.messageToSend.emit(updatedDisplayJson);
      }
    );    
  }

  getAll(){
    this.membersService.getAll(this.currentPage).subscribe(
      (res) => {
        this.members =  res;
      }
    );
  }

  delete(member:any){
    this.members.splice(this.members.findIndex(memberTemp => memberTemp == member), 1);
    this.membersService.delete(member._id).subscribe(
      (res:any) => {
        console.log(res.message);
        this.getAll();
      }
    );;
  }

  nextPage(){
      this.currentPage++; 
      this.membersService.getAll(this.currentPage).subscribe(
      (res) => {
        // console.log(`Current Page : ${this.currentPage} \n Result array length: ${res.length}`);
        if(res.length > 0){
          this.members =  res;
          this.firstElementOnPage += this.membersService.skips;
          this.lastElementOnPage += this.members.length;
        }else{
          this.currentPage--;
        }
      }
      )
  }

  prevPage(){
    this.currentPage--;
    if(this.currentPage > 0){
      let currentPageElements = this.members.length;
      this.membersService.getAll(this.currentPage).subscribe(
        (res) => {
          this.members =  res;
          this.firstElementOnPage -= this.membersService.skips;
          this.lastElementOnPage -= currentPageElements;
        }
      )
    }else{
      this.currentPage++;
    }
}

}
