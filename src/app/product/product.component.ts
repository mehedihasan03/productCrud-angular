import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductModel } from './product.model';
import {HttpClient} from '@angular/common/http' 
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

product: ProductModel = new ProductModel;

  constructor(private http: HttpClient, private toastr: ToastrService) { }
  Products: any;
  isShowTable: boolean = false;
  isSave: boolean = true;

  ngOnInit(): void {
    this.showTable();
  }

saveProduct(form: NgForm){
const headers = {'content-type': 'application/json'};
this.http.post("http://localhost:8082/saveProduct", JSON.stringify(this.product), {headers: headers})
.subscribe(data=>{
  this.product = new ProductModel();
  console.log(data);
  this.showTable();
  this.toastr.success('Product Insert Successfull!');
})
}

showTable(){
  this.http.get("http://localhost:8082/showProduct").subscribe(product=>{
    console.log(product);
    this.Products = product;
  })
}
toggleProduct(){
  console.log("Hellow Toggle");
  this.isShowTable = !this.isShowTable;
  console.log(this.isShowTable);
  
}

editProduct(product:any){
  console.log("Edit button");
  this.product= product;
  this.isSave = false;
  
}

updateProduct(){
console.log("Update Button");
this.isSave = true;
const headers = {'content-type': 'application/json'};
this.http.put("http://localhost:8082/saveProduct", JSON.stringify(this.product), {headers: headers})
.subscribe(data=>{
  this.product = new ProductModel();
  console.log(data);
  this.showTable();
  this.toastr.info('Product Updated Successfully!');
})

}

deleteProduct(product:any){
  console.log("delete button");
  const headers = {'content-type': 'application/json'};
  this.http.delete("http://localhost:8082/saveProduct?id="+product.id,{headers: headers})
  .subscribe((data=>{
    console.log(data);
    this.showTable();
    this.toastr.warning('Deletation Successfull!');
  }))
}

}
