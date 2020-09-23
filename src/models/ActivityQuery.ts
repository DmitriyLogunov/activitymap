import {BaseSelectionItem} from "../components/MultipleSelectionWidget";
import md5 from "md5";

export interface ActivityQueryData {
  after: number | null;
  before: number | null;
  maxCount: number;
  includePrivate: boolean;
}

export default class ActivityQuery implements BaseSelectionItem {
  private activityQueryData: ActivityQueryData;

  public key: string;

  public get(): ActivityQueryData {
    return this.activityQueryData;
  }

  public set(newData: ActivityQueryData) {
    this.activityQueryData = { ...newData };
    this.key = this.generateUniqueKey();
  }

  private generateUniqueKey(): string {
    const data = this.activityQueryData;
    return md5(
      (data.after ? data.after.toString() : "") + "-" +
      (data.before ? data.before.toString() : "") + "-" +
      data.maxCount.toString() + "-" +
      data.includePrivate.toString() + "-" +
      Date.now().toString()
    );
  }

  constructor(initialData: ActivityQueryData) {
    this.activityQueryData = { ...initialData };
    this.key = this.generateUniqueKey();
  }
}