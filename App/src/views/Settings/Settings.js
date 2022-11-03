import { StyleSheet, View } from "react-native";
import SettingsButton from "./SettingsButton";
import { useState } from "react";
import AddContactModal from "./Modals/AddContactModal";
import EditContactModal from "./Modals/EditContactModal";

const Settings = () => {
    const [addContactModalOpen, setAddContactModalOpen] = useState(false);
    const [editContactModalOpen, setEditContactModalOpen] = useState(false);
    
    const openAddContactModalHandler = () => {
        setAddContactModalOpen(true);
    }

    const openEditContactModalHandler = () => {
        setEditContactModalOpen(true);
    } 
    
    return (
        <View style={styles.container}>
            <SettingsButton settingsTitle="Add New Contact" pressHandler={openAddContactModalHandler}/>
            <SettingsButton settingsTitle="Edit Existing Contact" pressHandler={openEditContactModalHandler}/>
            <AddContactModal setIsVisible={setAddContactModalOpen} isVisible={addContactModalOpen}/>
            <EditContactModal isVisible={editContactModalOpen}/>
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