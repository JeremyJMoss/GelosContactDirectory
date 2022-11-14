import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, Pressable, View, Text} from "react-native";
import { DEPARTMENTS } from "../../../constants/constants";
import Contact from "../../Directory/Contact";

const ContactList = ({setContactListOpen, department}) => {
    const contacts = useSelector(state => state.contacts.contacts)

    const departmentIndex = DEPARTMENTS.findIndex(dep => {
        return dep === department;
    })

    const contactList = contacts.filter(contact => contact.department == departmentIndex); 

    return (
        <>
            <View style={styles.backButton}>
                <Pressable 
                android_ripple={{color: "#d9d9d9", borderless: true}}
                style={styles.pressableSurface}
                onPress={() => {
                    setContactListOpen(false);
                }}>
                    <Icon type="font-awesome" name="arrow-left" size={25} color="#262626"/>
                </Pressable>
            </View>
            <View style={styles.container}>
                {contactList.length !== 0 ? 
                <FlatList 
                data={contactList} 
                renderItem={(contact) => {
                    return <Contact contactInfo={contact.item}/>
                }}
                keyExtractor={(contact) => {
                    return contact.id
                }}/> :
                <Text style={styles.errorText}>No Contacts for this department...</Text>}
            </View>            
        </>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: -65,
        zIndex: 1,
        left: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    pressableSurface: {
        padding: 10
    },
    container: {
        padding: 15,
        flex: 1,
    },
    errorText: {
        fontSize: 20,
        textAlign: "center"
    }
})

export default ContactList;