import DepartmentList from "./DepartmentList";
import ContactList from "./ContactList/ContactList";
import { StyleSheet, View, } from "react-native";
import { useState } from "react";

const Departments = () => {

    const [department, setDepartment] = useState("");
    const [contactListOpen, setContactListOpen] = useState(false);

    return (
        <View style={styles.container}>
            {!contactListOpen && <DepartmentList setContactListOpen={setContactListOpen} selectDepartment={setDepartment}/>}
            {contactListOpen && <ContactList setContactListOpen={setContactListOpen} department={department}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    }
})

export default Departments;