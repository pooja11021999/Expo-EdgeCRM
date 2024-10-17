import { ColorPalette } from "@/constants/Colors";
import { textStyle } from "@/helpers/globalstyles";
import React from "react";
import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { scale } from "react-native-size-matters";
// import ListLoading from "./ListLoading";

interface PaginationProps {
  withLoading?: boolean;
  loading: boolean;
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
  loadMore: (page: number) => void;
  customStyle?: StyleProp<ViewStyle>;
  loadMoreStyle?: StyleProp<ViewStyle>;
}

const Pagination: React.FC<PaginationProps> = ({
  withLoading = true,
  loading,
  pagination,
  loadMore,
  customStyle = {},
  loadMoreStyle = {},
}) => {
  if (withLoading && loading) {
    return <></>;
    // <ListLoading />;
  }
  console.log("pagination--", pagination);
  return pagination.total > pagination.per_page &&
    pagination.current_page < pagination.total_pages ? (
    <TouchableOpacity
      style={styles.defaultBtnStyle}
      onPress={() => loadMore(pagination.current_page + 1)}
    >
      <Text style={loadMoreStyle ? loadMoreStyle : styles.defaultLoadMoreStyle}>
        Load More
      </Text>
    </TouchableOpacity>
  ) : (
    <View style={[{ height: 60 }, customStyle]} />
  );
};

export default Pagination;

export const styles = StyleSheet.create({
  defaultLoadMoreStyle: {
    ...textStyle(ColorPalette.black, scale(14)),
  },
  defaultBtnStyle: {
    backgroundColor: ColorPalette.lighterGray,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(8),
  },
});
