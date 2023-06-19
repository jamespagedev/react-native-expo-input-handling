import React from "react";
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from "react-native";
import { OrderProduct, OrderProductNameValidationStatus } from "@app/types";
import { ProductListItem } from "./productsListChildren";

interface Props {
  shopId: number;
  products: Array<OrderProduct>;
  unselectNameInput: (
    text: string,
    index: number,
    status: OrderProductNameValidationStatus
  ) => Promise<void>;
  unselectQtyInput: (text: string, index: number) => void;
  removeProduct: (index: number) => void;
}

export default function ProductsList(props: Props): JSX.Element {
  const { products } = props;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <ProductListItem {...props} prodIndex={index} product={item} />
        )}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        removeClippedSubviews={false} // <------------------ add this line
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
});
