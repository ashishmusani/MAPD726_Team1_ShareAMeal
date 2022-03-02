import { Component, OnInit } from '@angular/core';
import { FireserviceService } from 'src/services/fireservice.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {

  public items: any[] = [];

  constructor(private fireService: FireserviceService) { }

  ngOnInit() {

    this.fireService.getItems().then((d) => {
      d.subscribe({
        next: (qs) => qs.forEach((qds) => {
          console.log(qds.data());
          this.items.push(qds.data());
        })
      });
    });
  }

}
