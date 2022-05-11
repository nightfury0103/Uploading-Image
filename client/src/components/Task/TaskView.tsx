import React, { useEffect } from "react";

import { Row } from "react-bootstrap";

import TaskCard from "./TaskCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTasks } from "../../store/task";
import { TaskProps } from "../../type";

const TaskView: React.FC = () => {
  const dispatch = useAppDispatch();

  const tasks: TaskProps[] = useAppSelector((state) => state.task.tasks);

  const deleteResMsg: string = useAppSelector(
    (state) => state.task.deleteResMsg
  );

  useEffect(() => {
    // Get the tasks when the page is loaded
    dispatch(getTasks());
  }, []);

  return (
    <>
      <h2>
        Task View:{" "}
        {deleteResMsg && (
          <span style={{ fontSize: "16px" }}>{deleteResMsg}</span>
        )}
      </h2>
      <div className="border border-1 p-2 rounded-3">
        {tasks.length === 0 ? (
          <label>There's no task yet. Please add task.</label>
        ) : (
          <Row>
            {tasks.map((task: TaskProps, key: number) => (
              <TaskCard task={task} key={key} />
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default TaskView;
