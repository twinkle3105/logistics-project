package com.logistics.service;

import com.logistics.model.Shipment;
import com.logistics.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ShipmentService {
    @Autowired
    private ShipmentRepository shipmentRepository;

    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    public Optional<Shipment> getShipmentById(Long id) {
        return shipmentRepository.findById(id);
    }

    public Optional<Shipment> getShipmentByTrackingNumber(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber);
    }

    public List<Shipment> getShipmentsByStatus(String status) {
        return shipmentRepository.findByStatus(status);
    }

    public Shipment createShipment(Shipment shipment) {
        if (shipment.getTrackingNumber() == null || shipment.getTrackingNumber().isEmpty()) {
            shipment.setTrackingNumber("TRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return shipmentRepository.save(shipment);
    }

    public Shipment updateShipment(Long id, Shipment shipmentDetails) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
        
        shipment.setCustomer(shipmentDetails.getCustomer());
        shipment.setDriver(shipmentDetails.getDriver());
        shipment.setVehicle(shipmentDetails.getVehicle());
        shipment.setOrigin(shipmentDetails.getOrigin());
        shipment.setDestination(shipmentDetails.getDestination());
        shipment.setStatus(shipmentDetails.getStatus());
        shipment.setWeight(shipmentDetails.getWeight());
        shipment.setDescription(shipmentDetails.getDescription());
        
        return shipmentRepository.save(shipment);
    }

    public void deleteShipment(Long id) {
        shipmentRepository.deleteById(id);
    }
}
