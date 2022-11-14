import { Modal, View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contactActions } from "../../../../store/contacts";
import ContactListItem from "./UI/ContactListItem";
import PrimaryButton from "./UI/PrimaryButton";
import useHttp from "../../../hooks/usehttp";
import { BASE_URL, DEPARTMENTS } from "../../../constants/constants";
import { Icon } from "react-native-elements";
import ContactFormModal from "./ContactFormModel";

const EditContactList = ({isVisible, setIsVisible}) => {
    const contacts = useSelector(state => state.contacts.contacts);
    const dispatch = useDispatch();
    const [contactToDelete, setContactToDelete] = useState(null);
    const [contactToEdit, setContactToEdit] = useState(null);
    const {isLoading, error, sendRequest, setError} = useHttp();
    const [deletedContact, setDeletedContact] = useState(null);
    const [contactFormOpen, setContactFormOpen] = useState(false);

    const openDeleteConfirmationHandler = (contact) => {
        setContactToDelete(contact);
    }

    const closeDeleteConfirmationHandler = () => {
        setContactToDelete(null);
        setError(null);
        setDeletedContact(null);
    }
    
const openContactFormHandler = (contact) => {
    const names = contact.name.split(" ");
    const contactInfo = {
        id: contact.id,
        firstName: names[0],
        lastName: names[1],
        department: DEPARTMENTS[Number(contact.department)],
        phone: contact.phone,
        street: contact.street,
        suburb: contact.suburb,
        state: contact.state,
        postCode: contact.postCode,
        country: contact.country
    }
    setContactFormOpen(true); 
    setContactToEdit(contactInfo);
    
}

    const deleteHandler = () => {
        setError(null);
        sendRequest({
            url: `${BASE_URL}contacts?id=${contactToDelete.id}`,
            method: "DELETE"
        }, (delContact) => {
            sendRequest({
                url: `${BASE_URL}contacts`
            }, (data) => {
                dispatch(contactActions.setContacts(data));
                setDeletedContact(delContact);
            })
        })
    }

    return (
        <>
            {contactFormOpen && 
            <ContactFormModal
            editing={true}
            isVisible={true}
            setIsVisible={setContactFormOpen}
            contactToEdit={contactToEdit}/>
            }
            {!contactFormOpen && 
            <Modal visible={isVisible} transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.contactFormContainer}>
                        <View style={styles.container}>
                            {!contacts &&
                                <View style={styles.loadingContainer}>
                                    <Text style={styles.infoText}>No Contacts to Edit...</Text>
                                    <PrimaryButton
                                    buttonText="Close"
                                    style={styles.cancel}
                                    textColor={{color: "white"}}
                                    pressableSurface={styles.pressableSurface}
                                    pressHandler={closeDeleteConfirmationHandler}
                                    />
                                </View>
                            }
                            {deletedContact && 
                                <View style={styles.loadingContainer}>
                                    <Text style={styles.infoText}>{`${deletedContact.name} has been deleted`}</Text>
                                    <PrimaryButton 
                                    buttonText="OK"
                                    style={styles.cancel}
                                    textColor={{color: "white"}}
                                    pressableSurface={styles.pressableSurface}
                                    pressHandler={closeDeleteConfirmationHandler}
                                    />
                                </View>
                            }
                            {error && 
                                <View style={styles.loadingContainer}>
                                    <Text style={styles.infoText}>{error}</Text>
                                    <View style={styles.buttonContainer}>
                                        <View style={styles.btnRetry}>
                                            <Pressable style={styles.btnRetryPressable} onPress={deleteHandler}>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.btnText}>Retry </Text>
                                                    <Icon type="font-awesome" name="rotate-right"/>
                                                </View>
                                            </Pressable>
                                        </View>
                                        <View style={styles.btnRetry}>
                                            <Pressable style={styles.btnRetryPressable} onPress={closeDeleteConfirmationHandler}>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.btnText}>Close</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            }
                            {isLoading &&
                                <View style={styles.loadingContainer}>
                                    <Text style={styles.infoText}>Loading...</Text>
                                </View>
                            }
                            {!isLoading && !error && !deletedContact && contactToDelete &&
                                <View style={styles.deleteConfirmationContainer}>
                                    <View style={styles.centeringContainer}>
                                        <Text style={styles.infoText}>{`Are you sure you would like to delete this contact?`}</Text>
                                        <Text style={[styles.infoText, styles.bold]}>{contactToDelete.name}</Text>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                    <PrimaryButton 
                                    buttonText="Cancel"
                                    pressableSurface={styles.pressableSurface}
                                    pressHandler={closeDeleteConfirmationHandler}
                                    style={styles.cancel}
                                    textColor={{color: "white"}}
                                    />
                                    <PrimaryButton 
                                    pressableSurface={styles.pressableSurface}
                                    buttonText="Delete"
                                    pressHandler={deleteHandler}
                                    style={styles.delete}
                                    />
                                    </View>
                                </View>
                            }
                            {!isLoading && !contactToDelete && !error && !deletedContact && contacts &&
                                <>
                                    <FlatList
                                    data={contacts}
                                    renderItem={(contact) => {
                                        return (
                                            <ContactListItem
                                            contactInfo={contact.item}
                                            deleteConfirmationHandler={openDeleteConfirmationHandler}
                                            editHandler={openContactFormHandler}
                                            />
                                        )
                                    }}
                                    keyExtractor={(contact) => {
                                        return contact.id;
                                    }}
                                    />
                                    <PrimaryButton 
                                    buttonText="Cancel" 
                                    pressableSurface={styles.pressableSurface}
                                    pressHandler={() => {
                                        setIsVisible(false)
                                    }}
                                    style={styles.cancel}
                                    textColor={{color: "white"}}
                                    />
                                </>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
            }
        </>
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
    container : {
        height: "100%",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    pressableSurface: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    cancel: {
        backgroundColor: "#595959"
    },
    buttonContainer: {
        flexDirection: "row", 
        width: "100%",
        justifyContent: "space-evenly"
    },
    deleteConfirmationContainer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    infoText : {
        fontSize: 18,
        textAlign: "center",
        margin: 20
    },
    bold: {
        fontWeight: "bold"
    },
    centeringContainer: {
        alignItems: "center", 
        padding: 20
    },
    delete: {
        backgroundColor: "#c64c38"
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    btnText: {
        fontSize: 17,
        fontWeight: "bold",
    },
    btnRetryPressable: {
        paddingVertical: 12,
        paddingHorizontal: 25
    },
    btnRetry: {
        backgroundColor: "#d9d9d9",
        borderRadius: 12,
        marginTop: 20
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
})

export default EditContactList;