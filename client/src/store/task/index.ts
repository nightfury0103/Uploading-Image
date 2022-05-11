import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../../services/taskUpload.service";

import { TaskStateProps, TaskProps } from "../../type";

const initialState: TaskStateProps = {
  tasks: [],
  loading: false,
  uploading: false,
  deleting: false,
  deletingId: "",
  uploadResMsg: "",
  deleteResMsg: "",
};

export const getTasks = createAsyncThunk("task/getTasks", async () => {
  try {
    const response = await api.getTasks();

    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const uploadTask = createAsyncThunk(
  "task/uploadTask",
  async (taskData: FormData) => {
    try {
      const response = await api.uploadTask(taskData);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: number) => {
    try {
      const response = await api.deleteTask(taskId);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    initMessage: (state: TaskStateProps, action: PayloadAction<string>) => {
      console.log(action);
      state.uploadResMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state: TaskStateProps) => {
        state.loading = true;
      })
      .addCase(
        getTasks.fulfilled,
        (state: TaskStateProps, action: PayloadAction<any>) => {
          state.loading = false;
          state.tasks = action.payload.data as TaskProps[];
        }
      )
      .addCase(getTasks.rejected, (state: TaskStateProps) => {
        state.loading = false;
      })
      .addCase(uploadTask.pending, (state: TaskStateProps) => {
        state.uploading = true;
      })
      .addCase(
        uploadTask.fulfilled,
        (state: TaskStateProps, action: PayloadAction<TaskProps>) => {
          state.tasks = [...state.tasks, action.payload];
          state.uploading = false;
          state.uploadResMsg = "The task is successfully uploaded.";
        }
      )
      .addCase(uploadTask.rejected, (state: TaskStateProps) => {
        state.uploading = false;
        state.deleteResMsg = "The task isn't uploaded. Try again!";
      })
      .addCase(deleteTask.pending, (state: TaskStateProps, { meta }) => {
        state.deleting = true;
        state.deletingId = meta.arg.toString();
      })
      .addCase(
        deleteTask.fulfilled,
        (state: TaskStateProps, action: PayloadAction<any>) => {
          state.tasks = state.tasks.filter((task: TaskProps) => {
            return task.id !== parseInt(action.payload.id);
          });

          state.deleting = false;
          state.deletingId = "";
          state.deleteResMsg = "The task is successfully deleted.";
        }
      )
      .addCase(deleteTask.rejected, (state: TaskStateProps) => {
        state.deleting = false;
        state.uploadResMsg = "The task isn't deleted. Try again!";
      });
  },
});

export const { initMessage } = taskSlice.actions;

export default taskSlice.reducer;
