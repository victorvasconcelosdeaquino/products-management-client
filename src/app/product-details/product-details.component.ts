import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/model/product';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    id: null,
    description: '',
    isActive: false,
    manufactureDate: new Date(0),
    expiryDate: new Date(0),
    supplierName: '',
    supplierId: undefined,
    corporateTaxId: ''
  };
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
  }

  getProduct(id){
    this.api.getProduct(id)
      .subscribe(data => {
          this.product = data;
          this.isLoadingResults = false;
        });
  } 

  deleteProduct(id){
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
      .subscribe(res => {
        this.isLoadingResults =false;
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }   
}

 
