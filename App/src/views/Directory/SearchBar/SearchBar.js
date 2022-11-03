import { TextInput, View, StyleSheet } from "react-native";


const SearchBar = ({searchQuery, setSearchQuery}) => {
    
    
    const changeTextHandler = (text) => {
        setSearchQuery(text);
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={searchQuery} onChangeText={changeTextHandler} placeholder="Search Contacts..."/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        margin: 12,
        flex: 6,
        fontSize: 15
    }
})

export default SearchBar;