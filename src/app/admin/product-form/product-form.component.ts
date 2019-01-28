import { Product } from "./../../models/product";
import { ProductService } from "./../../product.service";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {
    title: "",
    price: "",
    category: "",
    imageUrl: ""
  };
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe(p => (this.product = p));
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(["/admin/products"]);

    console.log(product);
    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure you want o delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }

  ngOnInit() {}
}
