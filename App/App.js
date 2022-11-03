import { StyleSheet, View, TouchableHighlight } from 'react-native';

import Directory from './src/views/Directory/Directory';
import Departments from './src/views/Departments/Departments';
import Settings from "./src/views/Settings/Settings";
import { Provider } from 'react-redux';
import store from './store/index';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import { Icon } from "react-native-elements";

export default function App() {
  
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer >
      <Provider store={store}>
        <View style={styles.container}>
          <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if(route.name === "Directory"){
                iconName = "book"
              }
              else if(route.name === "Departments"){
                iconName = "building"
              }
              else if(route.name === "Settings"){
                iconName = "gear"
              }

              return <Icon type="font-awesome" size={size} color={color} name={iconName}/>;
            },
            tabBarButton: (props) => {
              return <TouchableHighlight underlayColor="#cb6d4f" {...props} />
              },
            tabBarStyle: {
              height: "8%",
            },
            tabBarLabelStyle: {
              fontSize: 15,
              marginBottom: 5,
            },
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: "#262626",
            tabBarInactiveTintColor: "#262626",
            tabBarActiveBackgroundColor: "#c64c38",
            tabBarInactiveBackgroundColor: "#c64c38",
            headerStyle: {
              backgroundColor: "#c64c38",
              height: 120
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 20
            }
          })}
          >
            <Tab.Screen 
            name="Directory" 
            component={Directory} />
            <Tab.Screen 
            name="Departments" 
            component={Departments} />
            <Tab.Screen 
            name="Settings"
            component={Settings} />
          </Tab.Navigator>
        </View>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
