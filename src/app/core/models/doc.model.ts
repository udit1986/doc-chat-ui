export interface DocumentItem {
  id: number;
  title: string;
  content: string;
  author: string;
  createDateTime: string;
  createdBy: string;
  lastChangedBy: string;
  lastChangedDateTime: string;
}

export interface DocumentState {
  documents: DocumentItem[];
  loading: boolean;
  error: Error | null;
}
