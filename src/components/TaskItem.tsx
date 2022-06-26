import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import { EditTaskArgs } from "../pages/Home";
import { ItemWrapper } from "./ItemWrapper";
import { Task } from "./TasksList";

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ id, newTitle }: EditTaskArgs) => void;
}

export const TaskItem = ({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitleValue, setNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);
  function handleStartEditing() {
    setIsEditing(true);
  }
  function handleCancelEditing() {
    setNewTitleValue(task.title);
    setIsEditing(false);
  }
  function handleSubmitEditing() {
    editTask({ id: task.id, newTitle: newTitleValue });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);
  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${task.id}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <TextInput
            ref={textInputRef}
            value={newTitleValue}
            onSubmitEditing={handleSubmitEditing}
            onChangeText={setNewTitleValue}
            editable={isEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            testID={`cancel-editing-${task.id}`}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color={"#b2b2b2"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`start-editing-${task.id}`}
            onPress={handleStartEditing}
          >
            <Icon name="edit-3" size={24} color={"#b2b2b2"} />
          </TouchableOpacity>
        )}
        <View style={styles.iconsDivider} />
        <TouchableOpacity
          testID={`trash-${task.id}`}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12,
  },
});
