import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { StackMainParamList } from "@app/navigation/stacks";
import { useOrdersStore } from "@app/stores";
import { BtnMain, MainView } from "@app/components";
import { ProductsList, TopShop } from "./productsChildren";
import { copyByValue, screenNavigations } from "@app/utils";
import { OrderProduct, OrderProductNameValidationStatus } from "@app/types";

const newProduct: OrderProduct = {
  validationNameStatus: "empty",
  name: "",
  qty: "1",
  notes: "",
};

export default function Products(): JSX.Element {
  // variables
  const refIsNextClicked = useRef(false);
  const navigation = useNavigation<StackNavigationProp<StackMainParamList>>();
  const { order, setProducts } = useOrdersStore((store) => store);
  const [tempProducts, setTempProducts] = useState<Array<OrderProduct>>([
    ...order.products,
    copyByValue(newProduct),
  ]);

  // functions
  const unselectNameInput = async (
    text: string,
    index: number,
    status: OrderProductNameValidationStatus
  ) => {
    const updatedProducts: Array<OrderProduct> = copyByValue(tempProducts);
    updatedProducts[index].name = text;
    updatedProducts[index].validationNameStatus = status;
    if (
      status === "success" &&
      updatedProducts[updatedProducts.length - 1].name.length > 0
    ) {
      updatedProducts.push(copyByValue(newProduct));
    }
    setTempProducts(updatedProducts);
  };

  const unselectQtyInput = (text: string, index: number) => {
    const updatedProducts: Array<OrderProduct> = copyByValue(tempProducts);
    updatedProducts[index].qty = text;
    setTempProducts(updatedProducts);
  };

  const removeProduct = (index: number) => {
    setTempProducts(tempProducts.filter((p, i) => i !== index));
  };

  const handleNext = () => {
    const validProducts = tempProducts.filter(
      (p) => p.validationNameStatus === "success"
    );
    if (validProducts.length === 0) return;
    refIsNextClicked.current = true;
    setProducts(validProducts);
  };

  // setup
  useEffect(() => {
    if (order.products.length > 0 && refIsNextClicked.current) {
      navigation.navigate(screenNavigations.review.route as never);
    }
  }, [order.products]);

  // render
  return (
    <MainView>
      <TopShop order={order} />
      <ProductsList
        shopId={order.shop?.id || 1}
        products={tempProducts}
        unselectNameInput={unselectNameInput}
        unselectQtyInput={unselectQtyInput}
        removeProduct={removeProduct}
      />
      <BtnMain name="Next" onPress={handleNext} />
    </MainView>
  );
}
