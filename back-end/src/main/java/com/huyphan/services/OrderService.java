package com.huyphan.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.huyphan.dao.predicateconstructors.factory.PredicateConstructorFactory;
import com.huyphan.dtos.OrderItemDto;
import com.huyphan.dtos.OrderPaginationOptionsDto;
import com.huyphan.dtos.PageDto;
import com.huyphan.mappers.OrderItemMapper;
import com.huyphan.mappers.OrderPaginationOptionsMapper;
import com.huyphan.mappers.PageMapper;
import com.huyphan.models.OrderItem;
import com.huyphan.models.OrderPaginationOptions;
import com.huyphan.models.SearchCriteria;
import com.huyphan.models.enums.ConstructorName;
import com.huyphan.models.enums.SearchCriteriaName;
import com.huyphan.repositories.OrderRepo;

/** Performs operations related to order. */
@Service
public class OrderService {

	@Autowired
	private AuthService authService;

	@Autowired
	private OrderRepo orderRepo;

	@Autowired
	private PageMapper<OrderItemDto, OrderItem> pageMapper;

	@Autowired
	private PredicateConstructorFactory<OrderItem> constructorFactory;

	@Autowired
	private OrderPaginationOptionsMapper paginationOptionsMapper;

	@Autowired
	private OrderItemMapper orderItemMapper;

	@Autowired
	private CartService cartService;

	/**
	 * Place order.
	 * 
	 * @param orderItemsDto All order items in the order.
	 */
	@Transactional
	public void placeOrder(List<OrderItemDto> orderItemsDto) {
		String username = authService.getCurrentAuthenticatedUser().getUsername();

		for (OrderItemDto orderItemDto : orderItemsDto) {
			OrderItem orderItem = orderItemMapper.fromDto(orderItemDto);
			orderItem.setUsername(username);
			cartService.delete(orderItem.getBookId());
			orderRepo.save(orderItem);
		}
	}

	/** Get a page of order items of the current user based on the pagination options. */
	public PageDto<OrderItemDto> getOrderItems(OrderPaginationOptionsDto paginationOptionsDto) {
		OrderPaginationOptions paginationOptions =
				paginationOptionsMapper.fromDto(paginationOptionsDto);

		int page = paginationOptions.getPage();
		int pageSize = paginationOptions.getPageSize();

		List<SearchCriteria> criteria = paginationOptions.getCriteria();
		criteria.add(createSearchByUsernameCriteria());

		Specification<OrderItem> spec = orderRepo.getSpecification(criteria, constructorFactory);
		Page<OrderItem> pageResult = orderRepo.findAll(spec, PageRequest.of(page, pageSize));

		return pageMapper.toDto(pageResult, orderItemMapper);
	}

	private SearchCriteria createSearchByUsernameCriteria() {
		String username = authService.getCurrentAuthenticatedUser().getUsername();

		SearchCriteria searchByUsername = new SearchCriteria();
		searchByUsername.setConstructorName(ConstructorName.SearchOrderByUsername);
		searchByUsername.setName(SearchCriteriaName.Text);
		searchByUsername.setValue(username);

		return searchByUsername;
	}
}
