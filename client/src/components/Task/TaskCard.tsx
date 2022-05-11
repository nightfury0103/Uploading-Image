import React from "react";

import { Col, Image, Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteTask } from "../../store/task";
import { TaskProps } from "../../type";

import "./style.css";

interface TaskCardProps {
  task: TaskProps;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const deleting: boolean = useAppSelector((state) => state.task.deleting);
  const deletingid: string = useAppSelector((state) => state.task.deletingId);

  const handleDeleteBtn = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <Col xs={6} sm={4}>
      <div className="border border-1 rounded-3 m-2">
        <Image
          src={task.imgUrl}
          alt="task"
          className="w-100 rounded-3 card-image"
        />

        <div className="m-2">
          <p className="m-0">{task.title}</p>
          <Button
            variant="primary"
            size="sm"
            className="w-100"
            onClick={() => handleDeleteBtn(task.id)}
            disabled={
              deleting && parseInt(deletingid) === task.id ? true : false
            }
          >
            {deleting && parseInt(deletingid) === task.id
              ? "Deleting..."
              : "Delete"}
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default TaskCard;
