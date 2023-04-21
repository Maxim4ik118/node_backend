export type Book = {
  id: string;
  title: string;
  author: string;
};

export interface InvokeBookAction extends Partial<Book>  {
  action: "getAll" | "getById" | "deleteById" | "add" | "updateById",
};
