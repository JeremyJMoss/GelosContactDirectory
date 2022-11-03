import { useState } from "react";
import {Text, View, FlatList, Pressable, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import DepartmentSelection from "./DepartmentSelection";

const DropDown = ({selected, setSelected, data}) => {
    
    const [dropdownOpen, setDropDownOpen] = useState(false);

    const dropDownPressHandler = () => {
        setDropDownOpen(state => !state);
    }

    return (
        <>
        <View style={styles.dropDownBox}>
            <Pressable onPress={dropDownPressHandler} style={styles.dropDownButton}>
                <Text style={styles.headerText}>{!selected ? "Select Option" : selected}</Text>
                {dropdownOpen ? <Icon type="font-awesome" name="angle-up" style={styles.icon}/> : <Icon type="font-awesome" name="angle-down" style={styles.icon}/>}
            </Pressable>
        </View>
        {dropdownOpen && <View style={styles.dropDown}>
            <FlatList
            data={data}
            renderItem={(department) => {
                return (
                    <DepartmentSelection
                    department={department.item}
                    setSelected={setSelected}
                    setDropDownOpen={setDropDownOpen}
                    />
                )
            }}
            keyExtractor={(department) => {
                return department;
            }}/>
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
    }
})

export default DropDown;