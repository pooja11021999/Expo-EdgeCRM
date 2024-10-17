import {
  AddButton,
  MenuHeader,
  Pagination,
  SearchBar,
} from "@/components/index";
import useCustomListContainer from "@/components/Logic/CustomListContainer";
import { ColorPalette } from "@/constants/Colors";
import { useSession } from "@/context/ctx";
import { globalStyles } from "@/helpers/globalstyles";
import { Octicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import CompanyCard from "./CompanyCard";

interface Company {
  id: string;
  companyName?: string;
  city?: string;
}

interface CompanyScreenProps {
  navigation: any;
}

const CompanyScreen: React.FC<CompanyScreenProps> = ({ navigation }) => {
  const data: { InitialCompanyData?: Company[] } = {};

  const { session } = useSession();

  const {
    list,
    pagination,
    paginationLoading,
    sorting,
    filtering,
    loading,
    error,
    getData,
    updateData,
    updateFilterSort,
    clear,
    searchUpdate,
  } = useCustomListContainer({
    url: "/api/account/view-accounts",
    api_token: session as string,
    search_query: "name",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // getData(1);
    console.log("list--", list?.length);
  }, []);

  const getDetails = (item: object) => {
    console.log(item);
    // navigation.navigate("CompanyDetailsScreen", { item });
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleIconPress = () => {
    // navigation.navigate("CompanyDetailsForm", {});
  };

  const filteredData: any = []; // Assuming the filter function is implemented
  // const filteredData = data?.InitialCompanyData?.filter(
  //   (item: Company) =>
  //     item.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.city?.toLowerCase().includes(searchQuery.toLowerCase())
  // ) || [];

  return (
    <View style={{ flex: 1 }}>
      <MenuHeader title="Company" leftButton="menu" navigation={navigation} />
      <View style={styles.searchBarContainer}>
        <SearchBar placeholder="Search" handleSearch={handleSearch} />
      </View>
      <FlatList
        data={searchQuery ? filteredData : list}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={[
          list?.length > 0
            ? styles.container
            : {
                ...globalStyles.container,
                backgroundColor: ColorPalette.white,
              },
        ]}
        renderItem={({ item }) => (
          <CompanyCard item={item} getDetails={getDetails} />
        )}
        ListEmptyComponent={<Text>No companies found.</Text>}
        ListFooterComponent={
          <Pagination
            loading={paginationLoading}
            pagination={pagination}
            loadMore={(page) => getData(page)}
          />
        }
      />

      <AddButton
        onIconPress={handleIconPress}
        renderIcon={() => (
          <Octicons name="plus" color={ColorPalette.white} size={scale(22)} />
        )}
      />
    </View>
  );
};

export default CompanyScreen;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.white,
  },
  searchBarContainer: {
    borderBottomColor: ColorPalette.lightGray,
    borderBottomWidth: scale(1),
  },
});
