import React from "react";
import { FlatList } from "react-native";
import { EditTaskArgs } from "../pages/Home";
import { TaskItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ id, newTitle }: EditTaskArgs) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem
            index={index}
            task={item}
            editTask={editTask}
            removeTask={removeTask}
            toggleTaskDone={toggleTaskDone}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
