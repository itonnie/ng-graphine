import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      console.log(slides.length);

      /*
      if(n > slides.length) {
        slideIndex = 1;
      }
      if(n < 1) {
        slideIndex = slides.length;
      }
      console.log(slides.length);
      for(i=0; i<slides.length; i++) {
        
      }*/
    }

    var slideIndex = 1;
    showSlides(slideIndex);

    function slide(n) {
      showSlides(slideIndex += n);
    }

    function currenctSlide(n) {
      showSlides(slideIndex = n);
    }
  }

  ngOnInit() {
  }
  
  schedule(id, sub, subsub) {
    var category;
    switch(id) {
      case 1:
        category = "Residential Repair and Maintenance";
        break;
      case 2:
        category = "Hotels and Medical Institutions Repair and Maintenance";
        break;
      case 3:
        category = "Commercial Repair and Maintenance";
        break;
      case 4:
        category = "Building Repairs and Maintenance";
        break;
      case 5:
        category = "Entertainment Equipment Repair and Maintenance";
        break;
      case 6:
        category = "Green Energy Solutions";
        break;
      default:
        category = "None Picked";
        break;
    }

    this.router.navigate(['/schedule'], {
      queryParams: {
        category: category,
        sub: sub,
        subsub: subsub
      }
    });
  }


}
