export default interface ActivityQuery {
  after: number | null;
  before: number | null;
  maxCount: number;
  includePrivate: boolean;
}