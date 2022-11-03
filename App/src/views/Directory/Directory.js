import { StyleSheet, View} from 'react-native';
import SearchBar from "./SearchBar/SearchBar";
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { StatusBar } from 'expo-status-bar';
import DirectoryList from './DirectoryList';
import { useState } from "react";

const Directory = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <>
      <StatusBar style="dark"/>
      <View style={styles.container}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <DirectoryList searchQuery={searchQuery}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    minHeight: ScreenHeight
  },
});

export default Directory;