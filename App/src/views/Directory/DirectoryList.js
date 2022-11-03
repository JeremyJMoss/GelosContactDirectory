import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { useSelector, useDispatch} from 'react-redux';
import { contactActions } from "../../../store/contacts";
import { useEffect} from "react";
import Contact from "./Contact";

const DirectoryList = ({searchQuery}) => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);
    const isLoading = useSelector(state => state.contacts.isLoading);
    

    useEffect(() => {
        dispatch(contactActions.loading());
        fetch("http://192.168.1.93:5000/contacts")
        .then(response => response.json())
        .then(contactData => {
            dispatch(contactActions.setContacts(contactData));
            dispatch(contactActions.notLoading());
        })
    }, [dispatch, contactActions])

    

    let listContent;

        if (isLoading){
           listContent = <Text>Loading...</Text> 
        }
        else if(searchQuery){
            const filteredContacts = contacts.filter(contact => {
                return contact.name.toLowerCase().includes(searchQuery.toLowerCase())
            })
            if (filteredContacts.length === 0){
                listContent =  <Text style={styles.errorText}>No Contacts Match Your Search Query...</Text>
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
    errorText: {
        fontSize: 15,
        textAlign: "center"
    }
})

export default DirectoryList;