import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  isLoadingResults = false;
  productForm: FormGroup;

  constructor(private router: Router, private api: ApiService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'description': [null, Validators.required],
      'active': [null, Validators.required],
      'manufactureDate': [null, Validators.required],
      'expiryDate': [null, Validators.required],
      'supplier': [null, Validators.required],
    });
  }

  addProduct(form: NgForm){
    this.isLoadingResults = true;
    this.api.addProduct(form)
      .subscribe(res => {
        const id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }

}
