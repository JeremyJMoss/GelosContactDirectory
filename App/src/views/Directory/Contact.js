import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { DEPARTMENTS } from "../../constants/constants";

const Contact = ({contactInfo}) => {
    const [detailsOpen, setDetailsOpen] = useState(false);

    const formattedPhoneNumber = `${contactInfo.phoneNumber.slice(0, 2)} ${contactInfo.phoneNumber.slice(2, 6)} ${contactInfo.phoneNumber.slice(6, 10)}`
    
    const formattedAddress = `${contactInfo.street}, ${contactInfo.city}, ${contactInfo.state}, ${contactInfo.country}, ${contactInfo.postCode}`

    const pressHandler = () => {
        setDetailsOpen((state) => !state)
    }

    return (
            <View style={styles.contact}>
                <Pressable style={styles.btnView} onPress={pressHandler} android_ripple={{color: "#eeeeee", borderless: true}}>
                    <Text style={styles.contactText}>{contactInfo.name}</Text>
                    {detailsOpen && 
                       <>
                        <View style={styles.topInfoContainer}>
                            <View style={styles.infoContainer}>
                                <View style={styles.info}>
                                    <Text style={styles.infoTextHeader}>
                                        Phone
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <Text>
                                        {formattedPhoneNumber}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.info}>
                                    <Text style={styles.infoTextHeader}>
                                        Department
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <Text>
                                        {DEPARTMENTS[contactInfo.department]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.topInfoContainer}>
                            <View style={styles.infoContainer}>
                                <View style={styles.info}>
                                    <Text style={styles.infoTextHeader}>
                                        Address
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <Text>
                                        {formattedAddress}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </>}
                </Pressable>
            </View>   
        )
}

const styles = StyleSheet.create({
    contact: {
        flex: 1,
        backgroundColor: "#d9d9d9",
        borderRadius: 10,
        marginBottom: 10
    },
    btnView:{
        padding: 16,
    },
    contactText : {
        fontSize: 20
    },
    infoTextHeader: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#262626"
    },
    topInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoContainer: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10
    },
    info: {
        marginTop: 5
    }
})

export default Contact;