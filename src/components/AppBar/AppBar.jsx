import { View, StyleSheet, ScrollView, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: theme.colors.backGroundPrimaryAppBar,
    flexDirection: "row",
  },
  tabs: {
    margin: 10,
    backgroundColor: "blue",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  loadingText: {
    fontSize: 40,
  },
});

const AppBar = () => {
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error(error);
  }
  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data.me ? (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <AppBarTab to="/create-review">Create a review</AppBarTab>
            <AppBarTab to="/my-reviews">My reviews</AppBarTab>
            <AppBarTab to="/sign">Sign Out</AppBarTab>
          </View>
        ) : (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <AppBarTab to="/sign">Sign In</AppBarTab>
            <AppBarTab to="/sign-up">Sign Up</AppBarTab>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
