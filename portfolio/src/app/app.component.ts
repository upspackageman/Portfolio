import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{




  ngOnInit(): void {

  }


  async onActivate() {
     await window.scroll(0,0);
     this.reload_landing();
     await this.landing();

    //  const btn = await document.getElementById('landing');
    //  if(btn){
    //   btn.style.display = 'none';
    // }
  }

  async reload_landing(){
    console.log(10);
    setTimeout(() => {
      localStorage.removeItem('landing');
    }, 10000)
  }



  async landing(){
    const btn = await document.getElementById('landing');

    if(localStorage.getItem('landing') && btn){

      btn.classList.add('slit-out-vertical');
     // btn.style.zIndex = '-999';
    }
  }

  async onEnter(){
    const btn = await document.getElementById('landing');

    if(btn && !localStorage.getItem('landing')){
      btn.classList.add('slit-out-vertical');
      //btn.style.zIndex = '-999';
      localStorage.setItem('landing', 'no remove');
    }
  }


}
