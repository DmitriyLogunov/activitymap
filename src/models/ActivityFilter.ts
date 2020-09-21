type FilterDefinition =
  {
    filterType: "keyValuePair",
    filterRule: {key: string, filter: string},
  }
|
  {
    filterType: "keyWord",
    filterRule: string
  };

export default class ActivityFilter {
  private filter: FilterDefinition;

  constructor(filter: FilterDefinition) {
    this.filter = {
      ...filter
    };
  }

  public get() {
    return this.filter;
  }

  public set(filter: FilterDefinition) {
    this.filter = filter;
  }
}