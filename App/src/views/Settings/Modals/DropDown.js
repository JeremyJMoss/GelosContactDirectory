import { useState } from "react";
import {Text, View, Pressable, StyleSheet, ScrollView} from "react-native";
import {Icon} from "react-native-elements";
import Selection from "./Selection";

const DropDown = ({selected, data, setSelected, hasError, hasSubmitted}) => {
    
    const [dropdownOpen, setDropDownOpen] = useState(false);

    const dropDownPressHandler = () => {
        setDropDownOpen(state => !state);
    }

    return (
        <>
        <View style={[styles.dropDownBox, hasError && hasSubmitted ? styles.errorField : null]}>
            <Pressable onPress={dropDownPressHandler} style={styles.dropDownButton}>
                <Text style={[styles.headerText, hasError && hasSubmitted ? styles.errorText : null]}>{!selected ? "Select Option" : selected}</Text>
                {dropdownOpen ? <Icon type="font-awesome" name="angle-up" style={styles.icon}/> : <Icon type="font-awesome" name="angle-down" style={styles.icon}/>}
            </Pressable>
        </View>
        {dropdownOpen && <View style={styles.dropDown}>
            <ScrollView>
            {data.map((item) => {
                return (
                    <Selection
                    selection={item}
                    setSelected={setSelected}
                    setDropDownOpen={setDropDownOpen}
                    key={item}
                    />
                )
            })}
            </ScrollView>
        </View>}
        </>

    )
}

const styles = StyleSheet.create({
    dropDownBox: {
        borderWidth: 1,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 10,
        zIndex: 3,
    },
    dropDownButton: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center"
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1
    },
    dropDown: {
        borderWidth: 1,
        position: "absolute",
        width: "100%",
        paddingTop: 45,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: "#ffffff",
        zIndex: 2
    },
    errorText: {
        color: "#941a1d"
    },
    errorField: {
        borderWidth: 3,
        borderColor: "#941a1d"
    }
})

export default DropDown;