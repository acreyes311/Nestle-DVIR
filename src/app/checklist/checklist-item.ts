import { ChecklistContent } from './checklist-content';
import { ChecklistStatus } from './checklist-status.enum';
import { autoserialize, inheritSerialization } from 'cerialize';

/**
 * An object of this class represents one item (e.g. Accident Kit) and one check box (either pre or post) on the physical DVIR.
 * Since Pre-Trip and Post-Trip will have their own form, one check box is sufficient.
 */
@inheritSerialization(ChecklistContent)
export class ChecklistItem extends ChecklistContent {

  /**
   * Equivalent to a blank/checked/crossed check box in the physical form.
   * The box is by default blank.
   * See {@link ChecklistStatus}
   */
  @autoserialize
  status: ChecklistStatus;

  /**
   * An optional comment field when an item is labeled as defect/needRepair.
   * TODO: implement UI and logic.
   */
  @autoserialize
  comment: string;

  /**
   * Optional image field to display item and accompany comment
   */
  @autoserialize
  image: string;

  /**
   * Construct a check list item with the given name.
   * @param title the name/short description of this checklist item.
   */
  public constructor(title: string) {
    super();
    this.title = title;
    this.status = ChecklistStatus.None;
  }

  public toDBFormat(): ChecklistItemType {
    let ret: ChecklistItemType = {
      status: ChecklistStatus[this.status].toLowerCase()
    };
    if (this.image) { ret.photo = this.image; }
    if (this.comment) { ret.comment = this.comment; }
    return ret;
  }
}

export interface ChecklistItemType {
  status: string;
  photo?: string;
  comment?: string;
}
