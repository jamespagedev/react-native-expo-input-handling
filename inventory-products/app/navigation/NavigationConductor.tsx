import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackMain } from "@app/navigation/stacks";

export default function NavigationConductor() {
  return (
    <NavigationContainer>
      <StackMain />
    </NavigationContainer>
  );
}
