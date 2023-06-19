import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import {
  AntDesign as AntIcon,
  MaterialIcons as MatIcon,
} from "@expo/vector-icons";
import { OrderProductNameValidationStatus } from "@app/types";
import { fakeApiValidateProduct } from "@app/apis";

interface Props {
  shopId: number;
  prodIndex: number;
  prodName: string;
  prodValidation: OrderProductNameValidationStatus;
  unselectNameInput: (
    text: string,
    index: number,
    status: OrderProductNameValidationStatus
  ) => Promise<void>;
}

export default function NameInput({
  shopId,
  prodIndex,
  prodName,
  prodValidation,
  unselectNameInput,
}: Props): JSX.Element {
  // variables
  const [name, setName] = useState(prodName);
  const [isNameSelected, setIsNameSelected] = useState(false);

  // functions
  const handleUnselectNameInput = async (text: string, prodIndex: number) => {
    setIsNameSelected(false);
    if (prodName === name) return;
    if (name.length > 0) {
      unselectNameInput(text, prodIndex, "validating");
      const prodValidResponse: boolean = await fakeApiValidateProduct(
        shopId as any,
        name
      );
      if (prodValidResponse) {
        unselectNameInput(text, prodIndex, "success");
      } else {
        unselectNameInput(text, prodIndex, "failed");
      }
    } else {
      unselectNameInput(text, prodIndex, "empty");
    }
  };

  // render
  return (
    <View style={{ position: "relative" }}>
      <Text>Name</Text>
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 2,
          borderColor: isNameSelected ? "#2ecc71" : "#96a6ad",
          borderRadius: 2,
        }}
        onChangeText={(text: string) => setName(text)}
        onFocus={() => setIsNameSelected(true)}
        onBlur={() => handleUnselectNameInput(name, prodIndex)}
        value={name}
      />
      {prodValidation === "success" ? (
        <View style={{ position: "absolute", bottom: 24, right: 10 }}>
          <AntIcon name="checkcircle" size={24} color="#23c0b5" />
        </View>
      ) : prodValidation === "failed" ? (
        <View style={{ position: "absolute", bottom: 24, right: 10 }}>
          <MatIcon name="error" size={24} color="#ffa125" />
        </View>
      ) : prodValidation === "validating" ? (
        <View style={{ position: "absolute", bottom: 24, right: 10 }}>
          <ActivityIndicator size={25} />
        </View>
      ) : null}
    </View>
  );
}
