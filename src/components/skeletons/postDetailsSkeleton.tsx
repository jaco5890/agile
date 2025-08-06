import { View } from "react-native";
import { StyleService } from "@ui-kitten/components";
import SkeletonLoading from "expo-skeleton-loading";
import { Colors } from "../../constants";

const PostDetailsSkeleton = () => {
  return (
    <SkeletonLoading
      background={Colors.default.inputBorder}
      highlight={Colors.default.white}
    >
      <View style={styles.container}>
        <View style={styles.spacedRow}>
          <View style={styles.backButton} />
          <View style={styles.image} />
          <View style={styles.contentContainer}>
            <View style={styles.name} />
          </View>
        </View>
        <View style={styles.content} />
        <View style={styles.comment} />
        <View style={styles.spacedRow}>
          <View style={styles.image} />
          <View style={styles.contentContainer}>
            <View style={styles.name} />
          </View>
        </View>
      </View>
    </SkeletonLoading>
  );
};

const styles = StyleService.create({
  container: {
    flexDirection: "column",
  },
  spacedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginLeft: 16,
  },
  backButton: {
    width: 30,
    height: 15,
    marginRight: 20,
    backgroundColor: Colors.default.inputBorder,
  },
  image: {
    width: 32,
    height: 32,
    backgroundColor: Colors.default.inputBorder,
    borderRadius: 15,
  },
  contentContainer: {
    flex: 1,
    margin: 10,
  },
  name: {
    backgroundColor: Colors.default.inputBorder,
    width: "30%",
    height: 10,
    marginBottom: 3,
    borderRadius: 5,
  },
  content: {
    backgroundColor: Colors.default.inputBorder,
    width: "100%",
    height: 50,
    margin: 16,
    borderRadius: 5,
  },
  alignEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  comment: {
    backgroundColor: Colors.default.inputBorder,
    width: "20%",
    height: 10,
    marginLeft: 16,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PostDetailsSkeleton;
