import React, { memo, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
  prodIndex: number;
  prodQty: string;
  unselectQtyInput: (text: string, index: number) => void;
}

function QtyInput({
  prodIndex,
  prodQty,
  unselectQtyInput,
}: Props): JSX.Element {
  // variables
  const [qty, setQty] = useState(prodQty);
  const [isQtySelected, setIsQtySelected] = useState(false);

  // functions
  const handleUnselectedQtyInput = (text: string, prodIndex: number) => {
    if (!/^\d+$/.test(text) && text.length > 0) return; // numbers only
    setIsQtySelected(false);
    const qtyUpdated = text;
    if (qtyUpdated.length === 0) {
      setQty("1");
      unselectQtyInput("1", prodIndex);
    } else {
      unselectQtyInput(qtyUpdated, prodIndex);
    }
  };

  // render
  return (
    <View>
      <Text>Qty</Text>
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 2,
          borderColor: isQtySelected ? "#2ecc71" : "#96a6ad",
          borderRadius: 2,
        }}
        keyboardType="numeric"
        onChangeText={(text: string) => setQty(text)}
        onFocus={() => setIsQtySelected(true)}
        onBlur={() => handleUnselectedQtyInput(qty, prodIndex)}
        value={qty}
      />
    </View>
  );
}

export default memo(QtyInput);
