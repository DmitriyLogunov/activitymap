import {BaseSelectionItem} from "../components/MultipleSelectionWidget";
import md5 from "md5";

type FilterDefinition =
  {
    filterType: "keyValuePair",
    filterRule: { key: string, value: string },
  }
  |
  {
    filterType: "keyWord",
    filterRule: string
  };

export default class ActivityFilter implements BaseSelectionItem {
  private filter: FilterDefinition;
  public key: string;

  private generateKey() {
    return md5((this.filter.filterType === "keyWord") ? this.filter.filterRule : this.filter.filterRule.key + this.filter.filterRule.value);
  }

  constructor(filter: FilterDefinition) {
    this.filter = {
      ...filter
    };
    this.key = this.generateKey();
  }

  public get() {
    return this.filter;
  }

  public set(filter: FilterDefinition) {
    this.filter = filter;
  }
}