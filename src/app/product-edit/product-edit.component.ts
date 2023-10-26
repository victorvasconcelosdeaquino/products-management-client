import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productId: Number;
  productForm: FormGroup;

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'id': [null],
      'description': [null, Validators.required],
      'active': [null, Validators.required],
      'manufactureDate': [null, Validators.required],
      'expiryDate': [null, Validators.required],
      'supplier': [null, Validators.required],
    }); 
  }

  getProduct(id){
    this.api.getProduct(id)
      .subscribe(data => {
        this.productId = data.id;
        this.productForm.setValue({
          id: data.id,
          description: data.description,
          active: data.isActive, 
          manufactureDate: data.manufactureDate,
          expiryDate: data.expiryDate,
          supplier: data.supplierName
        })
      });
  }

  updateProduct(form: NgForm){
    this.isLoadingResults = true;
    this.api.updateProduct(this.productId, form)
      .subscribe(res => {
        debugger
        this.router.navigate(['/product-details' + this.productId]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }

}
