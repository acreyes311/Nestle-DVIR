import { Component, OnInit } from '@angular/core';
import { autoserialize, inheritSerialization } from 'cerialize';
import {ChecklistContent} from '../checklist/checklist-content';
import {ChecklistStatus} from '../checklist/checklist-status.enum';
import { ChecklistProviderService } from '../checklist/checklist-provider.service';

/**
 * Class new-trip: New trip is the beginning of a new form.
 * It will take in information about:
 * - Tractor/Truck No.
 * - Truck No.
 * - Trailer No.
 *  After completion it will lead you to a new form page(option for Pre/post trip) *
 */
@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.page.html',
  styleUrls: ['./new-trip.page.scss'],
})
export class NewTripPage implements OnInit {

  /**
   * Type to determine whether trip is pre-trip or post-trip
   */
  @autoserialize
  tripType: string;

  /**
   * ID number corresponding to truck used for creating new form
   */
  @autoserialize
  truckNumber: string;

  /**
   * Odometer reading of truck used for creating new form
   */
  @autoserialize
  odomReading: string;

  /**
   * (Optional) ID number corresponding to trailer used for creating new form
   */
  @autoserialize
  trailerNumber?: string;

  constructor(
    private checklistProvider: ChecklistProviderService
  ) { }

  /**
   * Set form's tripType to specified trip type input
   * @param trip is the type of trip to set tripType to
   */
  changeTrip(trip: string): void {
    this.tripType = trip;
  }

  /**
   * Return form's tripType
   */
  getTrip(): string {
    return this.tripType;
  }

  /**
   * Check form to make sure all necessary fields are filled out
   */
  checkFormComplete(): boolean {
    let complete = false;
    switch (this.tripType) {
      case 'pre-trip':
        complete = true;
        break;
      case 'post-trip':
        complete = true;
    }
    return complete;
  }

  initializeChecklist(): void {
    this.checklistProvider.makeNewChecklist();
    this.checklistProvider.getCurrentChecklist().tripType = this.tripType;
    this.checklistProvider.getCurrentChecklist().trailerNumber = this.truckNumber || null;
    this.checklistProvider.getCurrentChecklist().truckNumber = this.truckNumber;
    this.checklistProvider.getCurrentChecklist().odomReading = this.odomReading;
  }

  ngOnInit() {
  }

}
