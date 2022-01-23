package com.huyphan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.huyphan.dtos.ShippingAddressDto;
import com.huyphan.mappers.ShippingAddressMapper;
import com.huyphan.models.ShippingAddress;
import com.huyphan.models.User;
import com.huyphan.repositories.ShippingAddressRepo;
import com.huyphan.repositories.UserRepo;

/** Performs operations related to shipping address. */
@Service
public class ShippingAddressService {
	@Autowired
	private ShippingAddressRepo shippingAddressRepo;

	@Autowired
	private ShippingAddressMapper shippingAddressMapper;

	@Autowired
	private AuthService authService;

	@Autowired
	private UserRepo userRepo;

	/**
	 * Save shipping address.
	 * 
	 * @param shippingAddressDto Shipping address to save.
	 */
	@Transactional
	public void saveShippingAddress(ShippingAddressDto shippingAddressDto) {
		ShippingAddress shippingAddress = shippingAddressMapper.fromDto(shippingAddressDto);
		String username = authService.getCurrentAuthenticatedUser().getUsername();
		User user = userRepo.findById(username).get();
		ShippingAddress savedShippingAddress = shippingAddressRepo.save(shippingAddress);
		user.setShippingAddress(savedShippingAddress);
	}

	/** Get shipping address of the current user. */
	@Transactional(readOnly = true)
	public ShippingAddressDto getShippingAddress() {
		String username = authService.getCurrentAuthenticatedUser().getUsername();
		User user = userRepo.findById(username).get();
		ShippingAddress shippingAddress = user.getShippingAddress();

		if (shippingAddress == null) {
			return null;
		}

		return shippingAddressMapper.toDto(shippingAddress);
	}
}
