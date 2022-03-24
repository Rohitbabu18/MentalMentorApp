import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import Router from "./Router"

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <Drawer.Navigator
            // screenOptions={{ }}
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: 250,
                },
                drawerType: 'back',
                overlayColor: 'transparent',
                // drawerHideStatusBarOnOpen: true,
                drawerStatusBarAnimation: 'fade',
                drawerItemStyle: {
                    height: 200,
                    // backgroundColor: 'red'
                }
            }}

        >
            <Drawer.Screen name="Router" component={Router} />
        </Drawer.Navigator>
    );
}
export default DrawerNav;
