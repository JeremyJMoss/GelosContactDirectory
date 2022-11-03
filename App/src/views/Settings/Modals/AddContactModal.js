import { useState } from "react";
import { StyleSheet, Modal, View, TextInput, Text, Pressable} from "react-native";
import DropDown from "./DropDown";
import { DEPARTMENTS } from "../../../constants/constants";

const AddContactModal = ({isVisible, setIsVisible}) => {
    const [selected, setSelected] = useState("");
    
    const hideModalHandler = () => {
        setIsVisible(false);
        setSelected("");
    }

    const submitModalHandler = () => {
        setIsVisible(false);
        setSelected("");
    }
    
    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.contactFormContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.formHeader}>Add New Contact</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>First Name: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}/>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Last Name: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}/>
                        </View>
                    </View>
                    <View>
                        <DropDown
                        header="Department"
                        data={DEPARTMENTS}
                        setSelected={setSelected}
                        selected={selected}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable onPress={submitModalHandler}>
                            <View style={[styles.btn, styles.submit]}>
                                <Text style={styles.btnText}>Submit</Text>
                            </View>
                        </Pressable>
                        <View style={[styles.btn, styles.cancel]}>
                            <Pressable onPress={hideModalHandler} android_ripple={{color: "#d9d9d9"}}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </Pressable>   
                        </View>
                    </View>
                </View>  
            </View>
        </Modal>
    )
}

const styles= StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.25)"
    },
    contactFormContainer: {
        height: "90%",
        width: "90%",
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 20
    },
    headerContainer: {
        alignItems: "center",
        margin: 10,
        marginBottom: 20
    },
    formHeader: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#cb6d4f"
    },
    fieldText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    field: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        maxWidth: 180,
    },
    input: {
        padding: 5,
        textAlign: "center",
        borderRadius: 20,
        borderWidth: 1,
        flex: 2,
        fontSize: 15
    },
    btnContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row"  
    },
    btn: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    btnText: {
        fontSize: 17,
        fontWeight: "bold"
    },
    submit: {
        backgroundColor: "lightgreen"
    },
    cancel: {
        backgroundColor: "#c64c38"
    }
})

export default AddContactModal;