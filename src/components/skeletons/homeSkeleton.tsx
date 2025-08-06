
import { View } from "react-native";
import { StyleService } from "@ui-kitten/components";
import SkeletonLoading from "expo-skeleton-loading";
import { Colors } from "../../constants";

const HomeSkeleton = () => {
  return (
    <SkeletonLoading
      background={Colors.default.inputBorder}
      highlight={Colors.default.white}
    >
      <View style={styles.container}>
        <View style={styles.spacedRow}>
          <View style={styles.image} />
          <View style={styles.contentContainer}>
            <View style={styles.name} />
          </View>
        </View>
        <View style={styles.content} />
        <View style={styles.alignEnd}>
          <View style={styles.comment} />
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
    marginLeft: 16,
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
    height: 100,
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
    marginRight: 16,
    borderRadius: 5,
  },
});

export default HomeSkeleton;
