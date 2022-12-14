import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { useSelector, useDispatch} from 'react-redux';
import { useCallback } from "react";
import { contactActions } from "../../../store/contacts";
import { useFocusEffect } from '@react-navigation/native';
import Contact from "./Contact";
import useHttp from "../../hooks/usehttp";
import { BASE_URL } from "../../constants/constants";

const DirectoryList = ({searchQuery}) => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);
    const {isLoading, error, sendRequest} = useHttp(); 

    useFocusEffect(useCallback(() => {
        retrieveContacts();
    }, [retrieveContacts]))

    const retrieveContacts = () => {
        sendRequest({
            url: `${BASE_URL}contacts`
        }, (data) => {
            dispatch(contactActions.setContacts(data));
        })
    }

    

    let listContent;

        if (isLoading){
           listContent = <Text style={styles.text}>Loading...</Text> 
        }
        else if (error){
            listContent = (
                    <View style={styles.errorContainer}>
                        <Text style={styles.text}>{error}</Text>
                        <View style={styles.btn}>
                            <Pressable style={styles.btnPressable} onPress={retrieveContacts}>
                                <Text style={styles.errorText}>Fetch</Text>        
                            </Pressable>
                        </View>
                    </View>
            )
        }
        else if(searchQuery){
            const filteredContacts = contacts.filter(contact => {
                const contactNames = contact.name.toLowerCase().split(" ");
                let includeName = false;
                for (let name of contactNames) {
                    includeName = name.slice(0, searchQuery.length) === searchQuery.toLowerCase();
                    if (includeName){
                        return true;
                    }
                };
                return false
            })
            if (filteredContacts.length === 0){
                listContent =  <Text style={styles.text}>No Contacts Match Your Search Query...</Text>
            }
            else{
                listContent = <FlatList
                    style={styles.list}
                    data={filteredContacts}
                    renderItem={(contact) => <Contact contactInfo={contact.item}/>}
                    keyExtractor={(contact) => contact.id}
                />
            }
        }
        else {
            listContent = <FlatList
            style={styles.list} 
            data={contacts}
            renderItem={(contact) => {
                return (
                    <Contact contactInfo={contact.item}/>
                )
            }}
            keyExtractor={(contact) => contact.id}
            />
        }
        
    return (
        <View style={styles.listView}>
            {listContent}
        </View>
    )
}

const styles = StyleSheet.create({
    listView: {
        flex: 8,
        padding: 16,
        alignItems: "center"
    },
    list: {
        width: "100%"
    },
    text: {
        fontSize: 15,
        textAlign: "center"
    },
    errorText: {
        fontSize: 17
    },
    errorContainer: {
        alignItems: "center"
    },
    btnPressable: {
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    btn: {
        backgroundColor: "#c64c38",
        borderRadius: 12,
        marginTop: 20
    }
})

export default DirectoryList;