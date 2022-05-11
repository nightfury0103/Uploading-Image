import React, { useState, useEffect } from "react";

import { Form, Button, Image } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { uploadTask, initMessage } from "../../store/task";
import { TaskData } from "../../type";

const TaskUploadForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const uploading: boolean = useAppSelector((state) => state.task.uploading);
  const uploadResMsg: string = useAppSelector(
    (state) => state.task.uploadResMsg
  );

  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    taskImage: "",
  });

  const handleTaskUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const _taskData = new FormData();
    _taskData.append("image", taskData.taskImage);
    _taskData.append("title", taskData.title);

    dispatch(uploadTask(_taskData));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData((previousTaskData) => ({
      ...previousTaskData,
      taskImage: event.target.files ? event.target.files[0] : "",
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData((previousTaskData) => ({
      ...previousTaskData,
      title: event.target.value,
    }));
  };

  useEffect(() => {
    // Init state of uploading message when the task is new
    if (uploadResMsg) {
      dispatch(initMessage("uploadResMsg"));
    }
  }, [taskData.title, taskData.taskImage]);

  return (
    <>
      <h2>Task Upload</h2>

      <div className="border border-1 p-2 rounded-3 min-h-100">
        <Form className="form" onSubmit={handleTaskUpload}>
          <Form.Group className="mb-2">
            <Form.Label>Title of task:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Input title of task"
              value={taskData.title}
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Control
            type="file"
            className="mb-2"
            accept="image/*"
            name="image"
            multiple={false}
            onChange={handleFileChange}
          />

          <Button
            type="submit"
            color="primary"
            disabled={
              !taskData.title || !taskData.taskImage || uploading ? true : false
            }
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Form>

        {uploadResMsg && <p>{uploadResMsg}</p>}

        {taskData.taskImage && (
          <Image
            src={URL.createObjectURL(taskData.taskImage)}
            alt="task"
            className="mt-2 w-100"
            thumbnail
          />
        )}
      </div>
    </>
  );
};

export default TaskUploadForm;
