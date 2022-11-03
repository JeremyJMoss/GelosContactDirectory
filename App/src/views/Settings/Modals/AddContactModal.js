import { useState, useReducer } from "react";
import { formReducer, formInitialState} from "./Reducers/formReducer";
import { StyleSheet, Modal, View, Text} from "react-native";
import DropDown from "./DropDown";
import InputField from "./InputField";
import ModalButton from "./ModalButton";
import { DEPARTMENTS } from "../../../constants/constants";

const AddContactModal = ({isVisible, setIsVisible}) => {
    const [state, dispatch] = useReducer(formReducer, formInitialState);

    const hideModalHandler = () => {
        setIsVisible(false);
        dispatch({type: "RESET_FORM"})
    }

    const submitModalHandler = () => {
        setIsVisible(false);
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
                    <View style={styles.headerContainer}>
                        <Text style={styles.formHeader}>Add New Contact</Text>
                    </View>
                    <InputField 
                    fieldName="First Name" 
                    value={state.firstName.value}
                    textChangeHandler={textChangeHandler.bind(this, "firstName")}
                    />
                    <InputField 
                    fieldName="Last Name" 
                    value={state.lastName.value}
                    textChangeHandler={textChangeHandler.bind(this, "lastName")}
                    />
                    <View style={styles.dropDownContainer}>
                        <Text style={styles.fieldText}>Department: </Text>
                        <View style={{flex: 1}}>
                            <DropDown
                            header="Department"
                            data={DEPARTMENTS}
                            setSelected={changeDepartmentHandler}
                            selected={state.department.value}
                            />
                        </View>
                    </View>
                    <InputField 
                    fieldName="Phone No" 
                    keyboardType="number-pad"
                    value={state.phone.value}
                    textChangeHandler={textChangeHandler.bind(this, "phone")}
                    />
                    <InputField 
                    fieldName="Street" 
                    value={state.street.value}
                    textChangeHandler={textChangeHandler.bind(this, "street")}
                    />
                    <InputField 
                    fieldName="Suburb" 
                    value={state.suburb.value}
                    textChangeHandler={textChangeHandler.bind(this, "suburb")}
                    />
                    <InputField 
                    fieldName="State" 
                    value={state.state.value}
                    textChangeHandler={textChangeHandler.bind(this, "state")}
                    />
                    <InputField 
                    fieldName="Post Code" 
                    keyboardType="number-pad"
                    value={state.postCode.value}
                    textChangeHandler={textChangeHandler.bind(this, "postCode")}
                    />
                    <InputField 
                    fieldName="Country" 
                    value={state.country.value}
                    textChangeHandler={textChangeHandler.bind(this, "country")}
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