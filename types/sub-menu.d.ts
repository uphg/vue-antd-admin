import type { Menu } from 'ant-design-vue'

export declare class SubMenu extends Menu['SubMenu'] {
  /**
   * unique id of the menu item
   * @type string
   */
  key: string;

  /**
   * whether menu item is disabled or not
   * @default false
   * @type boolean
   */
  disabled: boolean;

  /**
   * title of the sub menu
   * @type string | slot
   */
  title: any;

  popupClassName: string;
  props: Record<string, unknown>
}
