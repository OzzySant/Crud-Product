package com.crud.product.controller;

import com.crud.product.domain.Product;
import com.crud.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")

public class Controller {

    private ProductService productService;

    @Autowired
    public void ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        Product productCreated = productService.create(product);

        return productCreated;
    }

    @GetMapping
    public List<Product> getAll() {
        List<Product> allProducts = productService.getAll();

        return allProducts;
    }

    @PatchMapping
    public Product update (@RequestBody Product product) {
        Product productUpdated = productService.update(product);

        return productUpdated;
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long productId) {
        productService.deleteById(productId);

    }


}
