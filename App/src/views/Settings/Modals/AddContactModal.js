import { useState, useReducer } from "react";
import  useHttp from "../../../hooks/usehttp";
import { formReducer, formInitialState} from "./Reducers/formReducer";
import { StyleSheet, Modal, View, Text, ScrollView, Pressable} from "react-native";
import DropDown from "./DropDown";
import { Icon } from "react-native-elements";
import InputField from "./InputField";
import ModalButton from "./ModalButton";
import { DEPARTMENTS } from "../../../constants/constants";

const AddContactModal = ({isVisible, setIsVisible}) => {
    const [state, dispatch] = useReducer(formReducer, formInitialState);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const {isLoading, error, setError, sendRequest} = useHttp();

    // checking all error states of state
    const cannotSubmit = Object.values(state).some(field => {
            return field.hasError;
        })

    const hideModalHandler = () => {
        setIsVisible(false);
        setHasSubmitted(false);
        setError(null);
        dispatch({type: "RESET_FORM"})
    }

    const submitModalHandler = () => {
        setHasSubmitted(true);
        if(cannotSubmit){ 
            return;
        }
        sendRequest({
            url: "http://192.168.1.93:5000/contacts",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                firstName: state.firstName.value,
                lastName: state.lastName.value,
                department: state.department.value,
                phone: state.phone.value,
                street: state.street.value,
                suburb: state.suburb.value,
                state: state.state.value,
                postCode: state.postCode.value,
                country: state.country.value
            }
        }, (data) => {
            console.log(data);
            dispatch({type: "RESET_FORM"})    
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
                    {isLoading && !error && (
                        <View>
                            <Text>Sending Request...</Text>
                        </View>
                    )}
                    {error && (
                        <View style={styles.errorContainer}>
                            <Text>{error}</Text>
                            <View style={styles.btnRetry}>
                                <Pressable style={styles.btnRetryPressable} onPress={() => {
                                    setError(null);
                                    submitModalHandler()
                                }}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.btnText}>Retry </Text>
                                        <Icon type="font-awesome" name="rotate-right"/>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.btnRetry}>
                                <Pressable style={styles.btnRetryPressable} onPress={() => {
                                    hideModalHandler();
                                }}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.btnText}>Close</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    {!isLoading && !error && (
                    <ScrollView>    
                        <View style={styles.headerContainer}>
                            <Text style={styles.formHeader}>Add New Contact</Text>
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
                            <ModalButton 
                            pressHandler={submitModalHandler} 
                            buttonText="Submit" 
                            style={styles.submit}
                            />
                            <ModalButton 
                            pressHandler={hideModalHandler} 
                            buttonText="Cancel" 
                            style={styles.cancel}
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
    errorContainer : {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    }
})

export default AddContactModal;