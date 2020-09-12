export default interface ActivitySelectionData {
  after: number | null;
  before: number | null;
  maxCount: number;
  includePrivate: boolean;
}