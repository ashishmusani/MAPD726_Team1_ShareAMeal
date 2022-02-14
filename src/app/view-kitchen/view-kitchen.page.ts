import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/services/fireservice.service';


@Component({
  selector: 'app-view-kitchen',
  templateUrl: './view-kitchen.page.html',
  styleUrls: ['./view-kitchen.page.scss'],
})
export class ViewKitchenPage implements OnInit {

  kitchens: any[]= [
    {
      name:'Honey Nut Cheerios',
      maker: 'General Mills',
      address: 'Location XYZ'
    },
    {
      name:'Frosted Flakes',
      maker: 'Kelloggs',
      address: 'Location XYZ'
    },
    {
      name:'Honey bunches of Oats',
      maker: 'Post',
      address: 'Location XYZ'
    },
    {
      name:'Cheerios',
      maker: 'General Mills',
      address: 'Location XYZ'
    },
    {
      name:'Cinnamon Tosat Crunch',
      maker: 'General Mills',
      address: 'Location XYZ'
    },
    {
      name:'Special K',
      maker: 'Kelloggs',
      address: 'Location XYZ'
    },
    {
      name:'Frosted Mini Wheats',
      maker: 'Kelloggs',
      address: 'Location XYZ'
    }
  ]

  constructor() { 
  }

  ngOnInit() {
  }


}
