import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { PrintErrorsComponent } from './print-errors.component';

interface Rate {
  carrier: string;
  totalRate: number;
  margin: number;
}

interface Location {
  companyName: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
}

@Component({
  selector: 'app-reactive-form-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextModule,
    PrintErrorsComponent
  ],
  templateUrl: './reactive-form-component.html',
})
export class ReactiveFormComponent implements OnInit {

  rates: Rate[] = [
    { carrier: 'FedEx', totalRate: 150.50, margin: 10 },
    { carrier: 'UPS', totalRate: 175.25, margin: 12 },
    { carrier: 'USPS', totalRate: 125.75, margin: 8 },
    { carrier: 'DHL', totalRate: 200.00, margin: 15 }
  ];

  selectedRates: Rate[] = [];
  displayUpdateMarginDialog = false;
  bulkMarginForm!: FormGroup;

  // Locations data
  locations: Location[] = [
    { companyName: 'Acme Corporation', address1: '123 Main Street', city: 'New York', state: 'NY', zip: '10001' },
    { companyName: 'Global Logistics Inc', address1: '456 Oak Avenue', city: 'Los Angeles', state: 'CA', zip: '90001' },
    { companyName: 'Swift Transport Ltd', address1: '789 Pine Road', city: 'Chicago', state: 'IL', zip: '60601' },
    { companyName: 'Express Shipping Co', address1: '321 Elm Boulevard', city: 'Houston', state: 'TX', zip: '77001' },
    { companyName: 'Prime Freight Services', address1: '654 Maple Drive', city: 'Phoenix', state: 'AZ', zip: '85001' },
    { companyName: 'Metro Cargo Solutions', address1: '987 Cedar Lane', city: 'Philadelphia', state: 'PA', zip: '19101' }
  ];

  filteredLocations: Location[] = [];
  filteredAddressLocations: Location[] = []; // For address dropdown without manual entry
  shipperForm!: FormGroup;
  isReadOnly = false; // Track if address fields should be read-only
  savedShipperData: any = null; // Store saved shipper data
  showComponent = true; // Control component visibility for re-rendering

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.bulkMarginForm = this.fb.group({
      margin: [null, [Validators.required, Validators.min(0.01), Validators.max(99)]],
    });

    this.shipperForm = this.fb.group({
      shipperName: ['', Validators.required],
      address1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });

    // Restore saved data if exists
    if (this.savedShipperData) {
      this.shipperForm.patchValue(this.savedShipperData.formValues);
      this.isReadOnly = this.savedShipperData.isReadOnly;
    }
  }

  openBulkMarginDialog() {
    // Reset form and update validators when opening
    this.bulkMarginForm.reset();
    this.bulkMarginForm.updateValueAndValidity();
    this.displayUpdateMarginDialog = true;
  }

  applyBulkMargin(): void {
    const marginControl = this.bulkMarginForm.get('margin');
    if (!marginControl) {
      return;
    }

    if (this.bulkMarginForm.invalid) {
      this.bulkMarginForm.markAllAsTouched();
      return;
    }

    const margin = marginControl.value as number;

    // Apply margin to all selected rates
    this.selectedRates.forEach((rate) => {
      rate.margin = margin;
    });

    this.closeDialog();
  }

  closeDialog(): void {
    this.displayUpdateMarginDialog = false;
    this.bulkMarginForm.reset();
    const control = this.bulkMarginForm.get('margin');
    if (control) {
      control.setErrors(null);
    }
  }

  // Filter locations based on shipper name, city, state, or zip
  filterLocations(event: any): void {
    const query = event.query.toLowerCase();

    if (!query) {
      this.filteredLocations = [...this.locations];
    } else {
      this.filteredLocations = this.locations.filter(loc =>
        loc.companyName.toLowerCase().includes(query) ||
        loc.address1.toLowerCase().includes(query) ||
        loc.city.toLowerCase().includes(query) ||
        loc.state.toLowerCase().includes(query) ||
        loc.zip.includes(query)
      );
    }

    // Add manual entry option at the beginning
    if (query) {
      const manualOption: any = {
        companyName: query,
        address1: '',
        city: '',
        state: '',
        zip: '',
        isManualEntry: true
      };
      this.filteredLocations = [manualOption, ...this.filteredLocations];
    }
  }

  // Filter locations for address dropdown (no manual entry option)
  filterAddressLocations(event: any): void {
    const query = event.query.toLowerCase();

    if (!query) {
      this.filteredAddressLocations = [...this.locations];
    } else {
      this.filteredAddressLocations = this.locations.filter(loc =>
        loc.companyName.toLowerCase().includes(query) ||
        loc.address1.toLowerCase().includes(query) ||
        loc.city.toLowerCase().includes(query) ||
        loc.state.toLowerCase().includes(query) ||
        loc.zip.includes(query)
      );
    }
    // No manual entry option for address dropdown
  }

  // When a saved location is selected from dropdown
  onLocationSelect(event: any): void {
    const selectedLocation = event.value;

    // Check if it's a manual entry option
    if (selectedLocation.isManualEntry) {
      // User selected manual entry - keep fields editable
      this.isReadOnly = false;
      this.shipperForm.patchValue({
        shipperName: selectedLocation.companyName
      });

      // Re-render component
      this.reRenderComponent();
      return;
    }

    if (typeof selectedLocation === 'object' && selectedLocation.companyName) {
      // A saved location object was selected - combine address into one field
      const fullAddress = `${selectedLocation.address1}, ${selectedLocation.city}, ${selectedLocation.state} ${selectedLocation.zip}`;

      this.shipperForm.patchValue({
        shipperName: selectedLocation.companyName,
        address1: fullAddress,
        city: selectedLocation.city,
        state: selectedLocation.state,
        zip: selectedLocation.zip
      });

      // Make address field read-only (not disabled)
      this.isReadOnly = true;

      // Re-render component
      this.reRenderComponent();
    }
  }

  // Handle manual input in shipper name field
  onShipperNameInput(): void {
    // When user manually changes shipper name, unlock address1
    this.isReadOnly = false;

    // Re-render component
    this.reRenderComponent();
  }

  // When address is selected from dropdown
  onAddressSelect(event: any): void {
    const selectedLocation = event.value;

    if (typeof selectedLocation === 'object' && selectedLocation.companyName) {
      // A saved location object was selected - only fill address, NOT shipper name
      const fullAddress = `${selectedLocation.address1}, ${selectedLocation.city}, ${selectedLocation.state} ${selectedLocation.zip}`;

      this.shipperForm.patchValue({
        address1: fullAddress,
        city: selectedLocation.city,
        state: selectedLocation.state,
        zip: selectedLocation.zip
      });

      // Make address field read-only (not disabled)
      this.isReadOnly = true;

      // Re-render component
      this.reRenderComponent();
    }
  }

  // Handle manual input in address field
  onAddressInput(): void {
    // If user is manually typing, make fields editable
    if (this.isReadOnly) {
      this.isReadOnly = false;
    }
  }

  // Clear all shipper fields
  clearShipperFields(): void {
    this.shipperForm.patchValue({
      shipperName: '',
      address1: '',
      city: '',
      state: '',
      zip: ''
    });

    // Make fields editable
    this.isReadOnly = false;
  }

  // Save shipper data
  saveShipperData(): void {
    if (this.shipperForm.valid) {
      // Get all form values
      const formValues = {
        shipperName: this.shipperForm.get('shipperName')?.value,
        address1: this.shipperForm.get('address1')?.value,
        city: this.shipperForm.get('city')?.value,
        state: this.shipperForm.get('state')?.value,
        zip: this.shipperForm.get('zip')?.value
      };

      // Save the data
      this.savedShipperData = {
        formValues: formValues,
        isReadOnly: this.isReadOnly
      };

      // Show success message (you can replace with a toast notification)
      alert('Shipper data saved successfully!');

      // Trigger re-render by resetting and repopulating the form
      this.shipperForm.reset();
      setTimeout(() => {
        this.shipperForm.patchValue(formValues);
        this.isReadOnly = this.savedShipperData.isReadOnly;
      }, 0);
    }
  }

  // Re-render the component
  reRenderComponent(): void {
    // Save current form values before re-render
    const currentValues = {
      shipperName: this.shipperForm.get('shipperName')?.value,
      address1: this.shipperForm.get('address1')?.value,
      city: this.shipperForm.get('city')?.value,
      state: this.shipperForm.get('state')?.value,
      zip: this.shipperForm.get('zip')?.value
    };
    const currentReadOnly = this.isReadOnly;

    // Temporarily save the data
    this.savedShipperData = {
      formValues: currentValues,
      isReadOnly: currentReadOnly
    };

    // Trigger re-render by toggling component visibility
    this.showComponent = false;
    setTimeout(() => {
      this.showComponent = true;
    }, 0);
  }

  // Format location for display in dropdown
  getLocationDisplay(location: Location): string {
    return `${location.companyName} - ${location.address1}, ${location.city}, ${location.state} ${location.zip}`;
  }
}
