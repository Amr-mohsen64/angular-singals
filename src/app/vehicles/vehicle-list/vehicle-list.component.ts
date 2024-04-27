import { Component, computed, inject } from '@angular/core';
import { NgFor, NgClass, NgIf, AsyncPipe } from '@angular/common';
import { EMPTY, catchError } from 'rxjs';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-list',
  standalone: true,
  imports: [AsyncPipe, NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);

  // handling errors in signals with try and catch
  vehicles = computed(() => {
    try {
      return this.vehicleService.vehicles();
    } catch (error) {
      this.errorMessage =
        typeof error === 'string' ? error : 'An error occurred';
      return [];
    }
  });

  selectedVehicle = this.vehicleService.selectedVehicle;

  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }
}
