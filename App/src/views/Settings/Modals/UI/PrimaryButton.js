import { StyleSheet, View, Pressable, Text } from "react-native";

const PrimaryButton = ({textColor, style, pressHandler, buttonText, pressableSurface}) => {
    return (
        <View style={[styles.btn, style]}>
            <Pressable onPress={pressHandler} style={pressableSurface} android_ripple={{color: "#d9d9d9"}}>
                <Text style={[styles.btnText, textColor]}>{buttonText}</Text>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 20,
        overflow: "hidden"
    },
    btnText: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
    },
})
export default PrimaryButton;