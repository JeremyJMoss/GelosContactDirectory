import { StyleSheet, View, Pressable, Text } from "react-native";

const ModalButton = ({style, pressHandler, buttonText}) => {
    return (
        <View style={[styles.btn, style]}>
            <Pressable onPress={pressHandler} style={styles.pressableSurface} android_ripple={{color: "#d9d9d9"}}>
                <Text style={styles.btnText}>{buttonText}</Text>
            </Pressable>   
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row"  
    },
    btn: {
        borderWidth: 1,
        flex: 1,
        maxWidth: 100,
        borderRadius: 20,
        overflow: "hidden"
    },
    pressableSurface: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    btnText: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"
    },
})
export default ModalButton;