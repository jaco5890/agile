import { Colors } from "../../constants";
import { StyleService } from "@ui-kitten/components";
import SkeletonLoading from "expo-skeleton-loading";
import { View } from "react-native";

const UsersSkeleton = () => {
  return (
    <SkeletonLoading
      background={Colors.default.inputBorder}
      highlight={Colors.default.white}
    >
      <View style={styles.container}>
        <View style={styles.content} />
      </View>
    </SkeletonLoading>
  );
};

const styles = StyleService.create({
  container: {
    flexDirection: "column",
  },
  content: {
    backgroundColor: Colors.default.inputBorder,
    width: "100%",
    height: 50,
    marginBottom: 16,
    borderRadius: 5,
  },
});

export default UsersSkeleton;
