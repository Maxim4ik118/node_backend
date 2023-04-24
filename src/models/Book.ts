export type InvokeActions = "getAll" | "getById" | "deleteById" | "add" | "updateById"
export type Book = {
  id: string;
  title: string;
  author: string;
};

export interface InvokeActionProps extends Partial<Book>  {
  action: InvokeActions,
};
