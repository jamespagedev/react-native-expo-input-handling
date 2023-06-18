import { MainView } from "@app/components";
import { globalStyles } from "@app/styles";
import React from "react";
import { Text, View } from "react-native";

export default function Loading(): JSX.Element {
  return (
    <MainView>
      <View style={globalStyles.container}>
        <Text style={{ color: "#ffffff" }}>Loading</Text>
      </View>
    </MainView>
  );
}
