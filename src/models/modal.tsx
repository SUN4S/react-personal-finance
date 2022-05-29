export interface ModalInputs {
  date?: Date;
  category: string;
  amount: number;
  description?: string;
  tags?: Array<ModalTagInput>;
  receipt?: string;
}

export interface ModalTagInput {
  id: string;
  text: string;
}
