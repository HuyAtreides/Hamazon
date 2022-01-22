package com.huyphan.repositories;

import org.springframework.data.repository.CrudRepository;
import com.huyphan.models.ShippingAddress;

/** Shipping info repository. */
public interface ShippingAddressRepo extends CrudRepository<ShippingAddress, String> {

}
