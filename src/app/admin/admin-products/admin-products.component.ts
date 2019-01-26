import { Product } from "./../../models/product";
import { ProductService } from "./../../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.scss"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  cols: any[];
  recordCount: number;
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        products => {
          (this.filteredProducts = this.products = products)
          this.recordCount = products.length;
          console.log('length', this.recordCount);
        }
      );
  }


  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;



  }

  ngOnInit() {
    this.cols = [
      { field: "title", header: "Title" },
      { field: "price", header: "Price" }
    ];

    console.log("product ", this.products);


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
