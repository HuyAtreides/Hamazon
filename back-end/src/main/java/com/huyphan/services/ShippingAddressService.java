package com.huyphan.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.huyphan.dtos.ShippingAddressDto;
import com.huyphan.mappers.ShippingAddressMapper;
import com.huyphan.models.ShippingAddress;
import com.huyphan.repositories.ShippingAddressRepo;

/** Performs operations related to shipping address. */
@Service
public class ShippingAddressService {
	@Autowired
	private ShippingAddressRepo shippingAddressRepo;

	@Autowired
	private ShippingAddressMapper shippingAddressMapper;

	@Autowired
	private AuthService authService;

	/**
	 * Save shipping address. Update if there is existing shipping address associates with the
	 * current user, otherwise create new one.
	 * 
	 * @param shippingAddressDto Shipping address to save.
	 */
	@Transactional
	public void saveShippingAddress(ShippingAddressDto shippingAddressDto) {
		ShippingAddress shippingAddress = shippingAddressMapper.fromDto(shippingAddressDto);
		String username = authService.getCurrentAuthenticatedUser().getUsername();
		shippingAddress.setUsername(username);
		shippingAddressRepo.save(shippingAddress);
	}

	/** Get shipping address of the current user. */
	@Transactional(readOnly = true)
	public ShippingAddressDto getShippingAddress() {
		String username = authService.getCurrentAuthenticatedUser().getUsername();
		Optional<ShippingAddress> shippingAddress = shippingAddressRepo.findById(username);

		if (shippingAddress.isEmpty()) {
			return null;
		}

		return shippingAddressMapper.toDto(shippingAddress.get());
	}
}
