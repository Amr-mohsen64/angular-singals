import { Injectable, computed, signal } from '@angular/core';
import { Vehicle } from '../vehicles/vehicle';
import { CartItem } from './cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  // Total up the extended price for each item
  subTotal = computed(() =>
    this.cartItems().reduce(
      (a, b) => a + b.quantity * Number(b.vehicle.cost_in_credits),
      0
    )
  );

  deliveryFee = computed(() => (this.subTotal() < 100000 ? 999 : 0));

  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  totalPrice = computed(
    () => this.subTotal() + this.deliveryFee() + this.tax()
  );

  // Add the vehicle to the cart
  addToCart(vehicle: Vehicle): void {
    this.cartItems.mutate((items) => items.push({ vehicle, quantity: 1 }));
  }

  // Remove the item from the cart
  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update((items) =>
      items.filter((item) => item.vehicle.name !== cartItem.vehicle.name)
    );
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.vehicle.name === cartItem.vehicle.name
          ? { vehicle: cartItem.vehicle, quantity }
          : item
      )
    );
  }
}
