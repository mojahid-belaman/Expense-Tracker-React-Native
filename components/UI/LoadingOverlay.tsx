import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface ILoadingOverlay {
  indicatorConfig: ActivityIndicatorProps;
  styleContainer?: StyleProp<ViewStyle>;
}

function LoadingOverlay(props: ILoadingOverlay) {
  const { indicatorConfig, styleContainer } = props;
  return (
    <View style={[styles.container, styleContainer]}>
      <ActivityIndicator {...indicatorConfig} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
