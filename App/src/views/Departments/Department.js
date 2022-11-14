import {View, Pressable, Text, StyleSheet} from "react-native";

const Department = ({department, selectDepartment, setContactListOpen}) => {
    return(
        <View style={styles.button}>
            <Pressable 
            style={styles.clicky} 
            android_ripple={{color: "#eeeeee", borderless: true}}
            onPress={() => {
                selectDepartment(department);
                setContactListOpen(true);
            }}>
                <Text style={styles.department}>{department}</Text>
            </Pressable>        
        </View>
    )
}

const styles = StyleSheet.create({
    clicky: {
        padding: 16
    },
    button:{
        backgroundColor: "#d9d9d9",
        borderRadius: 10,
        margin: 5
    },
    department: {
        fontSize: 20,
    }
})

export default Department;