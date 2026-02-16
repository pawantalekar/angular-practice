import { Component } from '@angular/core';

@Component({
  selector: 'app-prime-ng-filtering',
  imports: [],
  templateUrl: './prime-ng-filtering.html',
  styleUrl: './prime-ng-filtering.css',
})
export class PrimeNgFiltering {

}
import {  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Rate {
  id: number;
  carrier: string;
  totalRate: number;
  margin?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: 'prime-ng-filtering.html',
})
export class AppComponent implements OnInit {
  rates: Rate[] = [];
  selectedRates: Rate[] = [];
  bulkMarginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // dummy table data
    this.rates = [
      { id: 1, carrier: 'FedEx', totalRate: 120 },
      { id: 2, carrier: 'UPS', totalRate: 150 },
      { id: 3, carrier: 'DHL', totalRate: 130 },
    ];

    this.bulkMarginForm = this.fb.group({
      margin: [null, [Validators.required, Validators.min(0.01), Validators.max(99)]],
    });
  }

  // live validation on input
  onBulkMarginInput() {
    // triggers validation immediately
    Promise.resolve().then(() => {
      this.bulkMarginForm.get('margin')?.updateValueAndValidity();
    });
  }

  applyBulkMargin() {
    if (this.bulkMarginForm.invalid) return;
    const margin = this.bulkMarginForm.get('margin')?.value;
    this.selectedRates.forEach((r) => (r.margin = margin));
    alert('Applied margin to selected rates!');
  }
}
