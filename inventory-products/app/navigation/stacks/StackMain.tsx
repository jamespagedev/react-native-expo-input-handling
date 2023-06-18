import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Products, Review, Shop } from "@app/screens";
import { screenNavigations } from "@app/utils";
import { rightToLeftAnimation } from "@app/styles";

export type StackMainParamList = {
  Products: undefined;
  Review: undefined;
  Shop: undefined;
};

const MainStack = createStackNavigator<StackMainParamList>();

const ScreenSlideRoutes = new Set([
  screenNavigations.products.route,
  screenNavigations.review.route,
]);

export function StackMain(): JSX.Element {
  return (
    <MainStack.Navigator
      initialRouteName={screenNavigations.shop.route as never}
      screenOptions={({ route }) => {
        return {
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#010409" },
          headerRightContainerStyle: { paddingRight: 10 },
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerTitleStyle: { color: "#ffffff" },
          headerTintColor: "#ffffff",
          gestureResponseDistance: 20,
          gestureEnabled: ScreenSlideRoutes.has(route.name),
          gestureDirection: "horizontal",
        };
      }}
    >
      <MainStack.Screen
        name={screenNavigations.shop.route as never}
        component={Shop}
        options={{ title: screenNavigations.shop.screenTitle }}
      />
      <MainStack.Screen
        name={screenNavigations.products.route as never}
        component={Products}
        options={{
          title: screenNavigations.products.screenTitle,
          ...rightToLeftAnimation,
        }}
      />
      <MainStack.Screen
        name={screenNavigations.review.route as never}
        component={Review}
        options={{
          title: screenNavigations.review.screenTitle,
          ...rightToLeftAnimation,
        }}
      />
    </MainStack.Navigator>
  );
}
