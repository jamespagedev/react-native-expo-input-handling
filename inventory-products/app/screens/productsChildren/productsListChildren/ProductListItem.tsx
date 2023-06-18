import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { OrderProduct, OrderProductNameValidationStatus } from "@app/types";
import { NameInput, QtyInput } from "./productListItemChildren";

interface Props {
  shopId: number;
  prodIndex: number;
  product: OrderProduct;
  unselectNameInput: (
    text: string,
    index: number,
    status: OrderProductNameValidationStatus
  ) => Promise<void>;
  unselectQtyInput: (text: string, index: number) => void;
  removeProduct: (index: number) => void;
}

export default function ProductListItem({
  shopId,
  prodIndex,
  product,
  unselectNameInput,
  unselectQtyInput,
  removeProduct,
}: Props): JSX.Element {
  return (
    <View style={{ marginBottom: 20, backgroundColor: "#ffffff" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#f8f8f6",
          borderBottomWidth: 1,
          borderBottomColor: "#cccccc",
        }}
      >
        <Text>PRODUCT {prodIndex + 1}</Text>
        {prodIndex !== 0 && (
          <Pressable
            style={styles.closeButton}
            onPress={() => removeProduct(prodIndex)}
          >
            <Icon name="close" size={24} color="#969696" />
          </Pressable>
        )}
      </View>
      <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
        <View
          style={{
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#cccccc",
          }}
        >
          <NameInput
            shopId={shopId}
            prodIndex={prodIndex}
            prodName={product.name}
            prodValidation={product.validationNameStatus}
            unselectNameInput={unselectNameInput}
          />
          <QtyInput
            prodIndex={prodIndex}
            prodQty={product.qty}
            unselectQtyInput={unselectQtyInput}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    paddingHorizontal: 3,
  },
});
