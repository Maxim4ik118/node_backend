export type Book = {
  id: string;
  title: string;
  author: string;
};

export type InvokeBookAction = {
  action: "getAll" | "getById" | "getByAuthor" | "getByTitle" | "add";
  title?: string;
  id?: string;
  author?: string;
};
