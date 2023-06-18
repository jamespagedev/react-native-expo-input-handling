import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { Order } from "@app/types";

interface Props {
  order: Order;
}

export default function TopShop({ order }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="user-alt" size={24} color="#ffffff" />
      </View>
      <Text style={styles.title}>{order.shop?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#30363d",
    backgroundColor: "#0d1117",
  },
  iconContainer: {
    padding: 10,
    backgroundColor: "#23c0b5",
    borderRadius: 50,
    marginRight: 10,
  },
  title: { color: "#ffffff", fontWeight: "700" },
});
