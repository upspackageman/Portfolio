import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isClicked:boolean = false;

  constructor() { }

  ngOnInit(): void {
    let dropdown = document.getElementById('dropdown');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  }

  async mobile_button(){
    const btn = document.getElementById('nav-icon2')
    let dropdown = document.getElementById('dropdown');

    if(this.isClicked){
      btn?.classList.remove('open');
      console.log(dropdown?.style.display);
      this.isClicked= false;
      if (dropdown) {
        dropdown.style.display = 'none';
      }

    }
    else{
      this.isClicked= true;
      btn?.classList.add('open');
      if (dropdown) {
        dropdown.style.display = 'block';
      }
    }


  }

}
