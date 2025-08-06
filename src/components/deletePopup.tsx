import React, { useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Card, Modal, StyleService } from "@ui-kitten/components";
import { useReduxSelector } from "../redux";
import { selectLogin } from "../redux/reducers/userReducer";
import { deleteComment } from "../servicesMock/comment.service";
import { deletePost } from "../servicesMock/post.service";
import { FeatherIcon } from "./icons";
import { Colors } from "../constants";
import { useToast } from "react-native-toast-notifications";

interface DeletePopupProps {
  type: "post" | "comment";
  targetId: number;
  popupOutput: (closePopup: boolean) => void;
}

export const DeletePopup: React.FC<DeletePopupProps> = ({
  type,
  targetId,
  popupOutput,
}) => {
  const stateUser = useReduxSelector(selectLogin);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const closePopup = () => {
    popupOutput(true);
  };

  const deleteClicked = async () => {
    //simulating if actual token was being used for api call and userId
    const token = stateUser?.token;
    const userId = stateUser?.userInformation?._id;
    const isComment = type === "comment";

    setLoading(true);
    try {
      const deleteResponse = isComment
        ? await deleteComment(targetId)
        : await deletePost(targetId);

      if (deleteResponse) {
        showSuccessToast(`Successfully deleted ${type}`);
        popupOutput(true);
      }
    } catch (err) {
      const error = err as Error;
      showErrorToast(error?.message || `Failed to delete ${type}`);
      popupOutput(true);
    }
  };

  const showSuccessToast = (message: string) => {
    setLoading(false);
    toast.show(message, {
      type: "success",
      placement: "bottom",
      duration: 3000,
      animationType: "slide-in",
    });
  };

  const showErrorToast = (message: string) => {
    setLoading(false);
    toast.show(message, {
      type: "danger",
      placement: "bottom",
      duration: 3000,
      animationType: "slide-in",
    });
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={true}
        style={styles.container}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {}}
      >
        <Card disabled style={styles.card}>
          <TouchableOpacity onPress={closePopup} style={styles.closeIcon}>
            <FeatherIcon
              name={"x"}
              size={24}
              color={Colors.default.secondary}
            />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.cardTitle}>
              Delete {type === "comment" ? "Comment" : "Post"}
            </Text>
          </View>

          <Text style={styles.deleteText}>
            Are you sure you want to delete this {type}? This action is
            irreversible.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.outlineButton} onPress={closePopup}>
              <Text style={styles.outlineButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={deleteClicked}
              disabled={loading}
            >
              <View style={styles.deleteButtonRow}>
                <Text style={styles.buttonText}>DELETE</Text>
                {loading && (
                  <ActivityIndicator
                    size="small"
                    color={Colors.default.white}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleService.create({
  container: {
    height: "60%",
    width: 330,
    flex: 1,
    position: "absolute",
    top: "15%",
    borderRadius: 30,
  },
  card: {
    paddingBottom: 10,
    borderRadius: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 20,
    color: Colors.default.primary,
    textAlign: "center",
    fontWeight: "600",
  },
  deleteText: {
    fontSize: 16,
    color: Colors.default.dark,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginTop: 20,
  },
  button: {
    borderRadius: 30,
    backgroundColor: Colors.default.primary,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  buttonText: {
    fontSize: 12,
    color: Colors.default.white,
    fontWeight: "700",
  },
  outlineButton: {
    borderRadius: 30,
    borderColor: Colors.default.primary,
    borderWidth: 1,
    backgroundColor: Colors.default.white,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  outlineButtonText: {
    fontSize: 12,
    color: Colors.default.primary,
    fontWeight: "700",
  },
  closeIcon: {
    alignItems: "flex-end",
  },
  deleteButtonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
