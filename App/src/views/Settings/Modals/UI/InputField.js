import { StyleSheet, View, Text, TextInput} from "react-native";

const InputField = ({value, hasSubmitted, hasError, fieldName, keyboardType, textChangeHandler}) => {
    
    return (    
        <View style={styles.field}>
            <Text style={[styles.fieldText, hasError && hasSubmitted ? styles.errorText : null]}>{`${fieldName}: ${hasError && hasSubmitted ? "*" : ""}`}</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                style={[styles.input, hasError && hasSubmitted ? styles.errorField : null]} 
                value={value}
                onChangeText={textChangeHandler} 
                keyboardType={keyboardType ? keyboardType : "ascii-capable"}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fieldText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    field: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        maxWidth: 200,
    },
    input: {
        padding: 5,
        paddingLeft: 20,
        borderRadius: 20,
        borderWidth: 1,
        flex: 2,
        fontSize: 15
    },
    errorText: {
        color: "#941a1d"
    },
    errorField: {
        borderColor: "#941a1d",
        borderWidth: 3
    }
})

export default InputField;