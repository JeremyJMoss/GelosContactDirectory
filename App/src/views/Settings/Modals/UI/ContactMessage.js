import { View, Text, Pressable, StyleSheet } from "react-native";
import { DEPARTMENTS } from "../../../../constants/constants";

const ContactMessage = ({contact, containerStyle, pressHandler, editing}) => {
    return (
        <View style={[containerStyle, styles.contactContainer]}>
            <Text style={styles.header}>{`${editing ? "Contact Updated Successfully!" : "New Contact Created!"}`}</Text>
            <Text style={styles.fieldText}>Name</Text>
            <Text style={styles.valueText}>{contact.name}</Text>
            <Text style={styles.fieldText}>Phone</Text>
            <Text style={styles.valueText}>{contact.phone}</Text>
            <Text style={styles.fieldText}>Address</Text>
            <Text style={styles.valueText}>{`${contact.street}, ${contact.suburb}, \n${contact.state}, ${contact.country}, ${contact.postCode}`}</Text>
            <Text style={styles.fieldText}>Department</Text>
            <Text style={styles.valueText}>{DEPARTMENTS[Number(contact.department)]}</Text>

            <View style={styles.button}>
                <Pressable style={styles.pressableButton} android_ripple={{color: "#595959"}} onPress={pressHandler}>
                    <Text>OK</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        color: "#c64c38",
        alignItems:"center",
        justifyContent: "center"
    },
    fieldText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    valueText: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10
    },
    contactContainer: {
      alignItems: "center",  
    },
    button: {
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "#d9d9d9",
        margin: 30,
        overflow: "hidden"
    },
    pressableButton: {
        paddingVertical: 8,
        paddingHorizontal: 25,
    }

})

export default ContactMessage;