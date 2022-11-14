import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { DEPARTMENTS } from "../../constants/constants";
import { Icon } from "react-native-elements";

const Contact = ({contactInfo}) => {
    const [detailsOpen, setDetailsOpen] = useState(false);

    const formattedPhoneNumber = `${contactInfo?.phone.slice(0, 4)} ${contactInfo?.phone.slice(4, 7)} ${contactInfo?.phone.slice(7, 10)}`
    
    const formattedAddress = `${contactInfo?.street}, ${contactInfo?.suburb}, ${contactInfo?.state}, ${contactInfo?.country}, ${contactInfo?.postCode}`

    const pressHandler = () => {
        setDetailsOpen((state) => !state)
    }

    return (
            <View style={styles.contact}>
                <Pressable style={styles.btnView} onPress={pressHandler} android_ripple={{color: "#eeeeee", borderless: true}}>
                    <View style={styles.contactNameContainer}>
                        <Text style={styles.contactText}>{contactInfo?.name}</Text>
                        {detailsOpen ? <Icon type="font-awesome" name="angle-up" style={styles.icon}/> : <Icon type="font-awesome" name="angle-down" style={styles.icon}/>}
                    </View>
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
                                    <Text style={styles.infoText}>
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
                                    <Text style={styles.infoText}>
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
                                    <Text style={styles.infoText}>
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
        fontSize: 18,
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
    },
    contactNameContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    infoText: {
        textAlign: "center",
        fontSize: 16
    }
})

export default Contact;