import { Text, View, StyleSheet } from "react-native";
import PrimaryButton from "./PrimaryButton";


const ContactListItem = ({contactInfo, editHandler, deleteConfirmationHandler}) => {
    return (
        <View style={styles.contactContainer}>
            <Text style={styles.contactText}>{contactInfo.name}</Text>
            <View style={styles.buttonContainer}>
                <PrimaryButton 
                buttonText="Edit" 
                pressableSurface={styles.pressableSurface} 
                style={styles.edit}
                pressHandler={editHandler.bind(this, contactInfo)}
                />
                <PrimaryButton 
                buttonText="Delete" 
                pressableSurface={styles.pressableSurface} 
                style={styles.delete}
                pressHandler={deleteConfirmationHandler.bind(this, contactInfo)}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    contactContainer: {
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    contactText: {
        fontSize: 19,
        marginRight: 20
    },
    buttonContainer: {
        flexDirection: "row"
    },
    edit: {
        backgroundColor: "#d9d9d9",
        marginRight: 15
    },
    delete: {
        backgroundColor: "#c64c38"
    },
    pressableSurface: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    }

})
export default ContactListItem;