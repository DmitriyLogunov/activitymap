import {CollectionEditorBaseItem} from "./CollectionEditorBaseItem";

export type ActivitySelectorTypes = "latest" | "dateRange" | "startDate";

export type ActivitySelector =
  {
    type: "latest",
    count: number,
  }
  |
  {
    type: "startDate",
    startDate: Date,
  }
  |
  {
    type: "dateRange",
    startDate: Date,
    endDate: Date,
  }

export interface ActivityQueryData {
  selector: ActivitySelector;
  includePrivate: boolean;
}

export default class ActivityQuery implements CollectionEditorBaseItem {
  private activityQueryData: ActivityQueryData;
  private static keyCounter = 0;

  public key: string;

  public get(): ActivityQueryData {
    return this.activityQueryData;
  }

  public getSelector() {
    return this.activityQueryData.selector;
  }

  public set(newData: ActivityQueryData) {
    this.activityQueryData = { ...newData };
  }

  private generateUniqueKey(): string {
    ActivityQuery.keyCounter++;
    return ActivityQuery.keyCounter.toString();
  }

  constructor(initialData: ActivityQueryData) {
    this.activityQueryData = { ...initialData };
    this.key = this.generateUniqueKey();
  }
}