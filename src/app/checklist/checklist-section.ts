import {ChecklistContent} from './checklist-content';
import {autoserialize, inheritSerialization} from 'cerialize';
import {ChecklistStatus} from './checklist-status.enum';
import {ChecklistItem} from './checklist-item';

/**
 * A class that contains a title and a list of {@link ChecklistContent}, where the content
 * can be a mix of {@link ChecklistItem} and {@link ChecklistSection}.
 */
@inheritSerialization(ChecklistContent)
export class ChecklistSection extends ChecklistContent {

  /**
   * A list of check list content
   * (could be some other sub-section ({@link ChecklistSection} or just {@link ChecklistItem})
   * This field was changed to {@link Map} for efficiency on cases where it is needed to find an item by name slug (e.g. routing).
   */
  @autoserialize
  items: Map<string, ChecklistContent>;
  itemList: Array<ChecklistContent>;

  /**
   * Optional image field to display item and accompany comment
   */
  // @autoserialize image: string;

  /**
   * Construct a named section of a given list of checklist content.
   * Checklist content can be a mix of {@link ChecklistItem} and {@link ChecklistSection}.
   *
   * For why mix type is useful, see {@link ChecklistContent}.
   *
   * @param title the name of this section.
   * @param items the items this sections holds
   */
  public constructor(title: string, ...items: Array<ChecklistContent>) {
    super();
    this.title = title;
    this.setItems(...items);
  }

  /**
   * Converting list of item to a {name slug -> item} map.
   *
   * @param items the list to convert
   */
  private setItems(...items: Array<ChecklistContent> ): void {
    this.itemList = items;
    this.items = new Map();
    items.forEach(
      i => this.items.set(
        i.title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, ''),
        i)
    );
  }


  /**
   * Get content of this list by name.
   *
   * @param key the name of the item
   */
  public getContents(key: string): ChecklistContent {
    return this.items.get(key);
  }

  public toDBFormat() {
    let ret = {};
    this.items.forEach((v, k, m) => {
      ret[k] = v.toDBFormat();
    });
    return ret;
  }
}

