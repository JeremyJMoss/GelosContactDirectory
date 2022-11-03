import {StyleSheet, Pressable, View, Text} from "react-native";

const SettingsButton = ({settingsTitle, pressHandler}) => {
    return (
        <View style={styles.settings}>
            <Pressable 
            style={styles.btnView} 
            onPress={pressHandler}
            android_ripple={{color: "#eeeeee", borderless: true}}>
                <Text 
                style={styles.settingsText}
                >{settingsTitle}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    settings: {
        backgroundColor: "#d9d9d9",
        borderRadius: 10,
        marginBottom: 10
    },
    btnView: {
        padding: 16,
    },
    settingsText: {
        fontSize: 20
    }
});

export default SettingsButton;