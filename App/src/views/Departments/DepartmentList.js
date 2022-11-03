import { ScrollView, StyleSheet, View} from "react-native";
import { DEPARTMENTS } from "../../constants/constants";
import Department from "./Department";

const DepartmentList = ({selectDepartment, setContactListOpen}) => {
    return (
        <View style={styles.departmentList}>
            <ScrollView>
                {DEPARTMENTS.map((department, i) => {
                    return (
                        <Department 
                        selectDepartment={selectDepartment}
                        setContactListOpen={setContactListOpen}
                        department={department} 
                        id={i}
                        key={i}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    departmentList: {
        flex: 9,
        padding: 10
    }
})

export default DepartmentList;
