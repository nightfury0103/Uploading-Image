export type TaskData = {
  title: string;
  taskImage: File | "";
};

export type TaskStateProps = {
  tasks: TaskProps[];
  loading: boolean;
  uploading: boolean;
  deleting: boolean;
  deletingId: string;
  uploadResMsg: string;
  deleteResMsg: string;
};

export type TaskProps = {
  id: number;
  key: string;
  imgUrl: string;
  title: string;
};
