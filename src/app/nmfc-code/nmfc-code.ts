import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

export interface NmfcItem {
  code: string;
  description: string;
  class: string;
  notes: string;
}

export interface NmfcGroup {
  code: string;
  description: string;
  items: NmfcItem[];
  expanded: boolean;
}

@Component({
  selector: 'app-nmfc-code',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    Select
  ],
  templateUrl: './nmfc-code.html',
  styleUrl: './nmfc-code.css',
})
export class NmfcCode {
  showPopup = false;
  selectedCode: string = '';
  selectedDescription: string = '';
  searchTerm: string = '';

  // Mock Data
  rawData: NmfcItem[] = [
    { code: '01234-33', description: 'Autobody Parts/Density based', class: '200', notes: '—' },
    { code: '01234-33', description: 'Autobody Parts/Density based', class: '200', notes: '—' },
    // A group with different classes
    { code: '01234-33', description: 'Autobody Parts/Density based', class: '50', notes: '—' },
    { code: '01234-33', description: 'Autobody Parts/Density based', class: '100', notes: '—' },
    { code: '01234-33', description: 'Autobody Parts/Density based', class: '100', notes: '—' },
    { code: '01234-33', description: 'Autobody Parts/Density based', class: '200', notes: '—' },
    { code: '01234-33', description: 'Autobody Parts/Density based', class: '200', notes: '—' },
    // Single items
    { code: '05678-01', description: 'Machinery Parts', class: '60', notes: '—' },
    { code: '09999-00', description: 'Plastic Articles', class: '110', notes: '—' },
  ];

  get groupedData(): NmfcGroup[] {
    const groups: { [key: string]: NmfcItem[] } = {};

    // 1. Filter first
    const filtered = this.rawData.filter(item =>
      item.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // 2. Group by code
    filtered.forEach(item => {
      if (!groups[item.code]) {
        groups[item.code] = [];
      }
      groups[item.code].push(item);
    });

    // 3. Convert to array
    return Object.keys(groups).map(code => {
      const items = groups[code];
      const isExpanded = this._expandedGroups.has(code);
      return {
        code,
        description: items[0].description,
        items,
        expanded: isExpanded
      };
    });
  }

  private _expandedGroups = new Set<string>();

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  closePopup() {
    this.showPopup = false;
  }

  selectItem(item: NmfcItem) {
    this.selectedCode = item.code;
    this.selectedDescription = item.description;
    this.closePopup();
  }

  toggleGroup(group: NmfcGroup) {
    if (this._expandedGroups.has(group.code)) {
      this._expandedGroups.delete(group.code);
    } else {
      this._expandedGroups.add(group.code);
    }
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
