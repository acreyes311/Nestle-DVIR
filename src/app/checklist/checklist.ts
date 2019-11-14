import { ChecklistSection } from './checklist-section';
import { autoserializeAs, autoserialize, inheritSerialization } from 'cerialize';

/**
 * The check list its self. May have extra info such as time and signature in the future.
 * Currently holds only a {@link ChecklistSection}
 */
export class Checklist {

  /**
   * The highest level checklist section this checklist holds
   */
  @autoserializeAs(ChecklistSection) private _sections: ChecklistSection;

  /**
   * ID used to identify respective form
   */
  @autoserialize private _id: number;

  /**
   * Type to determine whether trip is pre-trip or post-trip
   */
  @autoserialize private _tripType: string;

  /**
   * ID number corresponding to truck used for creating new form
   */
  @autoserialize private _truckNumber: string;

  /**
   * Odometer reading of truck used for creating new form
   */
  @autoserialize private _odomReading: string;

  /**
   * (Optional) ID number corresponding to trailer used for creating new form
   */
  @autoserialize private _trailerNumber: string;

  public constructor() {
  }


  get sections(): ChecklistSection {
    return this._sections;
  }

  set sections(value: ChecklistSection) {
    this._sections = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get tripType(): string {
    return this._tripType;
  }

  set tripType(value: string) {
    this._tripType = value;
  }

  get truckNumber(): string {
    return this._truckNumber;
  }

  set truckNumber(value: string) {
    this._truckNumber = value;
  }

  get odomReading(): string {
    return this._odomReading;
  }

  set odomReading(value: string) {
    this._odomReading = value;
  }

  get trailerNumber(): string {
    return this._trailerNumber;
  }

  set trailerNumber(value: string) {
    this._trailerNumber = value;
  }

  public toDBFormat() {
    return this._sections.toDBFormat();
  }
}
