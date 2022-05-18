package com.crud.product.service;

import com.crud.product.domain.Product;
import com.crud.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product create(Product product) {
        Product ProductSaved = productRepository.save(product);
        
        return ProductSaved;
    }
    
    public List<Product> getAll() {
        List<Product> allProducts = productRepository.findAll();

        return allProducts;
    }

    public Product update(Product product) {
        Product productSaved = productRepository.save(product);

        return productSaved;
    }

    public void deleteById(Long productId) {
        productRepository.deleteById(productId);
    }

}
