package com.order.order_service.controller;

import com.order.order_service.model.Order;
import com.order.order_service.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.io.IOException;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
@Validated
public class OrderController {

    // Temporary in-memory store (mock DB)
    private final Map<String, Order> orderStore = new HashMap<>();

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping
    public ResponseEntity<?> createOrder(
        @RequestParam @NotBlank(message = "Customer name is required") String customerName,
        @RequestParam @NotNull(message = "Order amount is required") @Positive(message = "Order amount must be positive") Double orderAmount,
        @RequestParam @NotNull(message = "Invoice file is required") MultipartFile invoice
    ) {
        if (invoice.isEmpty()) {
            return ResponseEntity.badRequest().body("Invoice file is required");
        }

        String orderId = UUID.randomUUID().toString();
        String fileUrl;
        try {
            fileUrl = cloudinaryService.uploadFile(invoice);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to upload invoice");
        }
        String orderDate = Instant.now().toString();

        Order order = new Order(orderId, customerName, orderAmount, orderDate, fileUrl);
        orderStore.put(orderId, order);

        System.out.println("✅ Mock SNS: Order created for " + customerName);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(new ArrayList<>(orderStore.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id) {
        Order order = orderStore.get(id);
        if (order == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(order);
    }

    @GetMapping("/invoice/{orderId}")
    public ResponseEntity<?> downloadInvoice(@PathVariable String orderId) {
        Order order = orderStore.get(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        // Simulate file download: In real app, fetch file from S3 or disk
        String fileName = order.getInvoiceFileUrl().substring(order.getInvoiceFileUrl().lastIndexOf('/') + 1);
        byte[] fileContent = ("This is a mock invoice for order " + orderId).getBytes();

        return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=\"" + fileName + "\"")
            .header("Content-Type", "application/octet-stream")
            .body(fileContent);
    }

    @GetMapping("/invoice/download/{orderId}")
    public ResponseEntity<?> downloadInvoiceLink(@PathVariable String orderId) {
        Order order = orderStore.get(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        String fileUrl = order.getInvoiceFileUrl();
        return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
    }

    @PostMapping("/upload-invoice")
    public ResponseEntity<String> uploadInvoice(@RequestParam("file") MultipartFile file) throws IOException {
        String url = cloudinaryService.uploadFile(file);
        return ResponseEntity.ok("Uploaded invoice URL: " + url);
    }
}
