import { StyleSheet, View } from "react-native";
import SettingsButton from "./SettingsButton";
import { useState } from "react";
import ContactFormModal from "./Modals/ContactFormModel";
import EditContactList from "./Modals/EditContactList";

const Settings = () => {
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [editContactListOpen, setEditContactListOpen] = useState(false);
    
    const openContactModalHandler = () => {
        setContactModalOpen(true);
    }

    const openEditContactListHandler = () => {
        setEditContactListOpen(true);
    }
    
    return (
        <View style={styles.container}>
            <SettingsButton settingsTitle="Add New Contact" pressHandler={openContactModalHandler}/>
            <SettingsButton settingsTitle="Edit Existing Contact" pressHandler={openEditContactListHandler}/>
            <ContactFormModal setIsVisible={setContactModalOpen} isVisible={contactModalOpen} editing={false}/>
            <EditContactList setIsVisible={setEditContactListOpen} isVisible={editContactListOpen}/>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    }
})

export default Settings;