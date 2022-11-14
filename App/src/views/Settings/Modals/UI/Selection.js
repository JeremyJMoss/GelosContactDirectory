import { Pressable, View, Text, StyleSheet} from "react-native";

const Selection = ({selection, setSelected, setDropDownOpen}) => {
    const pressHandler = () => {
        setSelected(selection);
        setDropDownOpen(false)
    }

    return (
        <View style={styles.selection}>
            <Pressable style={styles.selectionBtn} onPress={pressHandler}>
                <Text style={styles.selectionText}>{selection}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    selection: {
        borderBottomWidth: 1
    },
    selectionText: {
        fontSize: 16
    },
    selectionBtn: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    }
})

export default Selection;