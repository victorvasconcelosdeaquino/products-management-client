import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayerColumns: string [] = ['description', 'active', 'manufactureDate', 'expiryDate', 'supplier', 'action'];
  dataSource: Product[];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProducts()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    })
  }  

}
