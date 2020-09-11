export default interface ActivitySelection {
  after: number | null;
  before: number | null;
  maxCount: number;
  includePrivate: boolean;
}