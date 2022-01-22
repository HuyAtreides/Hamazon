package com.huyphan.models;

import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/** Represents a cart item. */
@Getter
@Setter
@Entity
@Table(name = "Cart")
public class CartItem extends Item {
}
