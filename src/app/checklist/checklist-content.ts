import { autoserialize } from 'cerialize';
/**
 * An common interface for both {@link ChecklistSection} and {@link ChecklistItem} so that
 * a {@link ChecklistSection} can contain another subsection.
 * A mixing type of item could be useful when, for example,
 * the tier checks is amount, for now let's assume, a few other items, such as Accident Kit and Air Compressor.
 * Then we can have a structure of:
 * <pre style="background: inherit;">
 * - Accident Kit (item)
 * - Air Compressor (item)
 * - Tires (section)
 *   - Left Front 1 (item)
 *   - Left Back 1  (item)
 *   - Left Back 2  (item)
 *   - etc.
 * </pre>
 * Another way to think about this is this will allow the checklist to become a tree,
 * where {@link ChecklistItem} become the leaves of the tree,
 * and {@link ChecklistSection} become branch/subtree of the whole tree.
 */
export abstract class ChecklistContent {

  /**
   * Title of the section
   */
  @autoserialize title: string;

  /**
   * Optional image field to display item/signature and accompany comment
   */
  @autoserialize image: string;

  public abstract toDBFormat();
}
