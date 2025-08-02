package com.order.order_service.model;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor

public class Order {
    private String orderId;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotNull(message = "Order amount is required")
    @Positive(message = "Order amount must be positive")
    private Double orderAmount;

    @NotBlank(message = "Order date is required")
    private String orderDate;         // ISO 8601 format

    @NotBlank(message = "Invoice file URL is required")
    private String invoiceFileUrl;    // Placeholder for S3 link

    // Explicit constructor for manual instantiation
    public Order(String orderId, String customerName, Double orderAmount, String orderDate, String invoiceFileUrl) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.orderAmount = orderAmount;
        this.orderDate = orderDate;
        this.invoiceFileUrl = invoiceFileUrl;
    }
}
