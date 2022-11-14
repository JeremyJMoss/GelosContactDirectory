import { useState, useReducer } from "react";
import  useHttp from "../../../hooks/usehttp";
import { titleCase } from "../../../constants/utility";
import { formReducer, formInitialState} from "./Reducers/formReducer";
import { StyleSheet, Modal, View, Text, ScrollView, Pressable} from "react-native";
import DropDown from "./UI/DropDown";
import { Icon } from "react-native-elements";
import InputField from "./UI/InputField";
import PrimaryButton from "./UI/PrimaryButton";
import ContactMessage from "./UI/ContactMessage";
import { contactActions } from "../../../../store/contacts";
import { DEPARTMENTS, BASE_URL } from "../../../constants/constants";
import { useDispatch } from "react-redux";

const ContactFormModal = ({isVisible, setIsVisible, contactToEdit, editing}) => {
    const [state, dispatch] = useReducer(formReducer, formInitialState(contactToEdit));
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatchContacts = useDispatch();
    // custom hook to manage http request
    const {isLoading, error, setError, sendRequest} = useHttp();
    const [contact, setContact] = useState(null);

    // checking all error states of state
    const cannotSubmit = Object.values(state).some(field => {
            return field.hasError;
        })

    const hideModalHandler = () => {
        setIsVisible(false);
        setHasSubmitted(false);
        setError(null);
        setContact(null);
        dispatch({type: "RESET_FORM"});
    }

    const submitModalHandler = () => {
        setError(null);
        setHasSubmitted(true);
        if(cannotSubmit){ 
            return;
        }
        const fullName = titleCase(state.firstName.value + " " + state.lastName.value)
        const street = titleCase(state.street.value);
        const suburb = titleCase(state.suburb.value);
        const country = titleCase(state.country.value);

        sendRequest({
            url: `${BASE_URL}contacts${editing ? `?id=${contactToEdit.id}` : ""}`,
            method: editing ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                fullName,
                department: DEPARTMENTS.findIndex(department => department === state.department.value),
                phone: state.phone.value,
                street,
                suburb,
                state: state.state.value.toUpperCase(),
                postCode: state.postCode.value,
                country
            }
        }, (updatedContact) => {
            sendRequest({
                url: `${BASE_URL}contacts`
            }, (data) => {
                dispatchContacts(contactActions.setContacts(data));
                setContact(updatedContact);
                dispatch({type: "RESET_FORM"})
            })
                
        })
        setHasSubmitted(false);
    }

    const textChangeHandler = (field, text) => {
        dispatch({type: "CHANGE_INPUT", payload: {name: field, value: text}});
    }

    const changeDepartmentHandler = (department) => {
        dispatch({type: "CHANGE_INPUT", payload: {name: "department", value: department}})
    }
    
    return (
        <Modal visible={isVisible} transparent={true}>   
            <View style={styles.modalBackground}>
                <View style={styles.contactFormContainer}>
                    {contact && !error && (
                        <ContactMessage
                        contact={contact}
                        containerStyle={styles.container}
                        pressHandler={hideModalHandler}
                        editing={editing} 
                        />
                    )}
                    {isLoading && !error && (
                        <View style={styles.container}>
                            <Text>Sending Request...</Text>
                        </View>
                    )}
                    {error && (
                        <View style={styles.container}>
                            <Text>{error}</Text>
                            <View style={styles.btnRetry}>
                                <Pressable style={styles.btnRetryPressable} onPress={submitModalHandler}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.btnText}>Retry </Text>
                                        <Icon type="font-awesome" name="rotate-right"/>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.btnRetry}>
                                <Pressable style={styles.btnRetryPressable} onPress={hideModalHandler}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.btnText}>Close</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    {!isLoading && !error && !contact && (
                    <ScrollView>    
                        <View style={styles.headerContainer}>
                            <Text style={styles.formHeader}>{`${editing ? "Edit" : "Add"} Contact`}</Text>
                        </View>
                        <InputField 
                        fieldName="First Name" 
                        value={state.firstName.value}
                        textChangeHandler={textChangeHandler.bind(this, "firstName")}
                        hasError={state.firstName.hasError}
                        hasSubmitted={hasSubmitted}
                        />
                        <InputField 
                        fieldName="Last Name" 
                        value={state.lastName.value}
                        textChangeHandler={textChangeHandler.bind(this, "lastName")}
                        hasError={state.lastName.hasError}
                        hasSubmitted={hasSubmitted}
                        />
                        <View style={styles.dropDownContainer}>
                            <Text style={[styles.fieldText, state.department.hasError && hasSubmitted ? styles.errorText : null]}>{`Department:${state.department.hasError && hasSubmitted ? "*" : ""}`}</Text>
                            <View style={{flex: 1}}>
                                <DropDown
                                data={DEPARTMENTS}
                                setSelected={changeDepartmentHandler}
                                selected={state.department.value}
                                hasError={state.department.hasError}
                                hasSubmitted={hasSubmitted}
                                />
                            </View>
                        </View>
                        <InputField 
                        fieldName="Phone No" 
                        keyboardType="number-pad"
                        value={state.phone.value}
                        textChangeHandler={textChangeHandler.bind(this, "phone")}
                        hasError={state.phone.hasError}
                        hasSubmitted={hasSubmitted}
                        />
                        <InputField 
                        fieldName="Street" 
                        value={state.street.value}
                        textChangeHandler={textChangeHandler.bind(this, "street")}
                        hasError={state.street.hasError}
                        hasSubmitted={hasSubmitted}
                        />
                        <InputField 
                        fieldName="Suburb" 
                        value={state.suburb.value}
                        textChangeHandler={textChangeHandler.bind(this, "suburb")}
                        hasError={state.suburb.hasError}
                        hasSubmitted={hasSubmitted}
                        />
                        <InputField 
                        fieldName="State" 
                        value={state.state.value}
                        textChangeHandler={textChangeHandler.bind(this, "state")}
                        hasError={state.state.hasError}
                        hasSubmitted={hasSubmitted}
                        />
                        <InputField 
                        fieldName="Post Code" 
                        keyboardType="number-pad"
                        value={state.postCode.value}
                        textChangeHandler={textChangeHandler.bind(this, "postCode")}
                        hasError={state.postCode.hasError}
                        hasSubmitted={hasSubmitted}
                        />
                        <InputField 
                        fieldName="Country" 
                        value={state.country.value}
                        textChangeHandler={textChangeHandler.bind(this, "country")}
                        hasError={state.country.hasError}
                        hasSubmitted={hasSubmitted}
                        />
                        <View style={styles.btnContainer}>
                            <PrimaryButton 
                            pressHandler={submitModalHandler} 
                            buttonText="Submit" 
                            style={styles.submit}
                            pressableSurface={styles.pressableSurface}
                            />
                            <PrimaryButton 
                            pressHandler={hideModalHandler} 
                            buttonText="Cancel" 
                            style={styles.cancel}
                            pressableSurface={styles.pressableSurface}
                            />
                        </View>
                    </ScrollView>
                )}
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
        fontWeight: "bold",
        marginBottom: 10
    },
    dropDownContainer : {
        flexDirection: "row",
        alignItems: "center"
    },
    btnContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginTop: 10  
    },
    btn: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    btnText: {
        fontSize: 17,
        fontWeight: "bold",
    },
    submit: {
        backgroundColor: "#006E33"
    },
    cancel: {
        backgroundColor: "#c64c38"
    },
    errorText: {
        color: "#941a1d"
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
    container : {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    pressableSurface: {
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})

export default ContactFormModal;