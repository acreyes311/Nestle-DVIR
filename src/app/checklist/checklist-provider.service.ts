import { Injectable } from '@angular/core';
import { Checklist } from './checklist';
import { ChecklistSection } from './checklist-section';
import { ChecklistItem } from './checklist-item';

/**
 * In this class we are creating the checklists and the items within them that will be used for the drivers to fill in
 * we are communicating this information with checklist-section, checklist-item, and checklist.
 */
@Injectable({
  providedIn: 'root'
})
export class ChecklistProviderService {

  /**
   * An instance of checklist that is being edited
   */
  private currentList: Checklist;

  constructor() {
  }

  /**
   * Get the checklist that is currently being edited.
   * This function will also initialize the {@link ChecklistProviderService#currentList} if the list is not initialized.
   */
  public getCurrentChecklist(): Checklist {
    if (!this.currentList) {
      this.currentList = this.tester();
    }
    return this.currentList;
  }

  public makeNewChecklist(): void {
    this.currentList = this.tester();
  }

  /**
   * A temporary function that creates and returns a checklist for testing.
   */
  public tester(): Checklist {
    const testlist = new Checklist();
    testlist.sections = new ChecklistSection(
      'form',
      new ChecklistSection(
        'Pre-Trip',
        new ChecklistSection(
          'STEP 1: Left side of the Cab Area',
          new ChecklistItem('Left front wheel'),
          new ChecklistItem('Condition of wheel'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Left front suspension'),
          new ChecklistItem('Left front break'),
          new ChecklistItem('Break drum'),
          new ChecklistItem('Hoses'),
          new ChecklistItem('Air chamber mounting'),
          new ChecklistItem('Check slack adjusters'),
        ),
        new ChecklistSection(
          'STEP 2: Front of Cab Area',
          new ChecklistItem('Condition of front axle'),
          new ChecklistItem('Condition of steering system'),
          new ChecklistItem('Condition of windshield'),
          new ChecklistItem('Lights and reflectors'),
        ),
        new ChecklistSection(
          'STEP 3: Right Side of Cab Area',
          new ChecklistItem('Right front wheel'),
          new ChecklistItem('Condition of wheel'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Right front suspension'),
          new ChecklistItem('Right front break'),
          new ChecklistItem('Break drum'),
          new ChecklistItem('Hoses'),
          new ChecklistItem('Air chamber mounting'),
          new ChecklistItem('Check slack adjusters'),
        ),
        new ChecklistSection(
          'STEP 4: Right Saddle Tank Area',
          new ChecklistItem('Right fuel tank(s)'),
          new ChecklistItem('Condition of visible parts'),
        ),
        new ChecklistSection(
          'STEP 5: Right Saddle Tank Area',
          new ChecklistItem('Air and electrical connections'),
          new ChecklistItem('Glad hands properly mounted, undamaged'), // not leaking'),
          new ChecklistItem('Lights and reflectors')
        ),
        new ChecklistSection(
          'STEP 6: Right Rear Tractor Wheels Area',
          new ChecklistItem('Dual wheels'),
          new ChecklistItem('Condition of wheels and rims'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Tires same type'), // e.g. not mixed radial and bias types'),
          new ChecklistItem('Tandem axles'),
          new ChecklistItem('Suspension'),
          new ChecklistItem('Brakes'),
        ),
        new ChecklistSection(
          'STEP 7: Rear of Tractor Area',
          new ChecklistItem('Frame and cross members not bent, or damaged '), // cracked or otherwise damaged'),
          new ChecklistItem('Frame and cross not missing lights and reflectors'),
          new ChecklistItem('Air and electrical lines secured and undamaged '), // properly secured to frame, not damaged or chafing'),
        ),
        new ChecklistSection(
          'STEP 8: Coupling System Area',
          new ChecklistItem('Fifth Wheel (lower)'),
          new ChecklistItem('No space between upper/lower fifth wheel'),
          new ChecklistItem('Locking jaws around the shank'), // and not the head of kingpin'),
          new ChecklistItem('Release lever properly seated/lock engaged'),
          new ChecklistItem('Fifth wheel (upper)'),
        ),
        new ChecklistSection(
          'STEP 9: Right Side of Trailer Area',
          new ChecklistItem('Front trailer support (landing gear or dollies)'),
          new ChecklistItem('Fully raised, not missing parts,or damaged'), // not bent or otherwise damaged'),
          new ChecklistItem('Crank handle present and secured'),
          new ChecklistItem('Lights and reflectors'),
          new ChecklistItem('Frame and body'),
          new ChecklistItem('Proper placarding'),
        ),
        new ChecklistSection(
          'STEP 10: Right Rear Trailer Wheels Area',
          new ChecklistItem('Dual wheels'),
          new ChecklistItem('Condition of wheels and rims'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Tires same type'), // e.g. not mixed radial and bias types'),
          new ChecklistItem('Tandem axles'),
          new ChecklistItem('Suspension'),
          new ChecklistItem('Brakes'),
        ),
        new ChecklistSection(
          'STEP 11: Rear of Trailer Area',
          new ChecklistItem('Lights and reflectors'),
          new ChecklistItem('Cargo securement'),
          new ChecklistItem('Cargo properly blocked, braced, tied'), // etc.'),
        ),
        new ChecklistSection(
          'STEP 12: Left Rear Trailer Wheels Area',
          new ChecklistItem('Dual wheels'),
          new ChecklistItem('Condition of wheels and rims'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Tires same type.'), // e.g. not mixed radial and bias types'),
          new ChecklistItem('Tandem axles'),
          new ChecklistItem('Suspension'),
          new ChecklistItem('Brakes'),
        ),
        new ChecklistSection(
          'STEP 13: Right Side of Trailer Area',
          new ChecklistItem('Front trailer support (landing gear or dollies)'),
          new ChecklistItem('Fully raised, not missing parts or damaged'), // not bent or otherwise damaged'),
          new ChecklistItem('Crank handle present and secured'),
          new ChecklistItem('Lights and reflectors'),
          new ChecklistItem('Frame and body'),
          new ChecklistItem('Proper placarding'),
        ),
        new ChecklistSection(
          'STEP 14: Left Saddle Tank Area',
          new ChecklistItem('Right fuel tank(s)'),
          new ChecklistItem('Condition of visible parts'),
        ),
      ),
      new ChecklistSection(
        'Post-Trip',
        new ChecklistSection(
          'STEP 1: Left side of the Cab Area',
          new ChecklistItem('Left front wheel'),
          new ChecklistItem('Condition of wheel'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Left front suspension'),
          new ChecklistItem('Left front break'),
          new ChecklistItem('Break drum'),
          new ChecklistItem('Hoses'),
          new ChecklistItem('Air chamber mounting'),
          new ChecklistItem('Check slack adjusters'),
        ),
        new ChecklistSection(
          'STEP 2: Front of Cab Area',
          new ChecklistItem('Condition of front axle'),
          new ChecklistItem('Condition of steering system'),
          new ChecklistItem('Condition of windshield'),
          new ChecklistItem('Lights and reflectors'),
        ),
        new ChecklistSection(
          'STEP 3: Right Side of Cab Area',
          new ChecklistItem('Right front wheel'),
          new ChecklistItem('Condition of wheel'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Right front suspension'),
          new ChecklistItem('Right front break'),
          new ChecklistItem('Break drum'),
          new ChecklistItem('Hoses'),
          new ChecklistItem('Air chamber mounting'),
          new ChecklistItem('Check slack adjusters'),
        ),
        new ChecklistSection(
          'STEP 4: Right Saddle Tank Area',
          new ChecklistItem('Right fuel tank(s)'),
          new ChecklistItem('Condition of visible parts'),
        ),
        new ChecklistSection(
          'STEP 5: Right Saddle Tank Area',
          new ChecklistItem('Air and electrical connections'),
          new ChecklistItem('Glad hands properly mounted, undamaged'), // not leaking'),
          new ChecklistItem('Lights and reflectors')
        ),
        new ChecklistSection(
          'STEP 6: Right Rear Tractor Wheels Area',
          new ChecklistItem('Dual wheels'),
          new ChecklistItem('Condition of wheels and rims'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Tires same type'), // e.g. not mixed radial and bias types'),
          new ChecklistItem('Tandem axles'),
          new ChecklistItem('Suspension'),
          new ChecklistItem('Brakes'),
        ),
        new ChecklistSection(
          'STEP 7: Rear of Tractor Area',
          new ChecklistItem('Frame and cross members not bent, or damaged '), // cracked or otherwise damaged'),
          new ChecklistItem('Frame and cross not missing lights and reflectors'),
          new ChecklistItem('Air and electrical lines secured and undamaged '),
        ),
        new ChecklistSection(
          'STEP 8: Coupling System Area',
          new ChecklistItem('Fifth Wheel (lower)'),
          new ChecklistItem('No space between upper/lower fifth wheel'),
          new ChecklistItem('Locking jaws around the shank'), // and not the head of kingpin'),
          new ChecklistItem('Release lever properly seated/lock engaged'),
          new ChecklistItem('Fifth wheel (upper)'),
        ),
        new ChecklistSection(
          'STEP 9: Right Side of Trailer Area',
          new ChecklistItem('Front trailer support (landing gear or dollies)'),
          new ChecklistItem('Fully raised, not missing parts,or damaged'), // not bent or otherwise damaged'),
          new ChecklistItem('Crank handle present and secured'),
          new ChecklistItem('Lights and reflectors'),
          new ChecklistItem('Frame and body'),
          new ChecklistItem('Proper placarding'),
        ),
        new ChecklistSection(
          'STEP 10: Right Rear Trailer Wheels Area',
          new ChecklistItem('Dual wheels'),
          new ChecklistItem('Condition of wheels and rims'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Tires same type'), // e.g. not mixed radial and bias types'),
          new ChecklistItem('Tandem axles'),
          new ChecklistItem('Suspension'),
          new ChecklistItem('Brakes'),
        ),
        new ChecklistSection(
          'STEP 11: Rear of Trailer Area',
          new ChecklistItem('Lights and reflectors'),
          new ChecklistItem('Cargo securement'),
          new ChecklistItem('Cargo properly blocked, braced, tied'), // etc.'),
        ),
        new ChecklistSection(
          'STEP 12: Left Rear Trailer Wheels Area',
          new ChecklistItem('Dual wheels'),
          new ChecklistItem('Condition of wheels and rims'),
          new ChecklistItem('Condition of tires'),
          new ChecklistItem('Tires same type.'), // e.g. not mixed radial and bias types'),
          new ChecklistItem('Tandem axles'),
          new ChecklistItem('Suspension'),
          new ChecklistItem('Brakes'),
        ),
        new ChecklistSection(
          'STEP 13: Right Side of Trailer Area',
          new ChecklistItem('Front trailer support (landing gear or dollies)'),
          new ChecklistItem('Fully raised, not missing parts or damaged'), // not bent or otherwise damaged'),
          new ChecklistItem('Crank handle present and secured'),
          new ChecklistItem('Lights and reflectors'),
          new ChecklistItem('Frame and body'),
          new ChecklistItem('Proper placarding'),
        ),
        new ChecklistSection(
          'STEP 14: Left Saddle Tank Area',
          new ChecklistItem('Right fuel tank(s)'),
          new ChecklistItem('Condition of visible parts'),
        ),
      ),
    );
    return testlist;
  }

}

