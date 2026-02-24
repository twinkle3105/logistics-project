package com.example.logistics.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String trackingId;

    @ManyToOne
    private Sender sender;

    @ManyToOne
    private Receiver receiver;

    private Double weight;
    private Double price;

    @Enumerated(EnumType.STRING)
    private ParcelStatus status;

    private LocalDateTime bookingDate;
    private LocalDateTime deliveryDate;

    private String deliveryProofUrl;

    @ManyToOne
    private User assignedDeliveryPerson;
}