export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string; // Pending,COMPLETED
  priority: string; // Low,Medium,High
  remarks: string;
}
