import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { StackMainParamList } from "@app/navigation/stacks";
import { fakeApiGetShops } from "@app/apis";
import { useOrdersStore } from "@app/stores";
import { BtnMain, MainView } from "@app/components";
import { getShopIdsToSelection, getShopSelections } from "./shopChildren";
import { screenNavigations } from "@app/utils";
import {
  OrderShop,
  OrderShopDropdownSelection,
  OrderShopIdsToDropdownSelection,
} from "@app/types";
import { globalStyles } from "@app/styles";
import Loading from "./Loading";

export default function Shop(): JSX.Element {
  // variables
  const navigation = useNavigation<StackNavigationProp<StackMainParamList>>();
  const { order, resetOrder, setShop } = useOrdersStore((store) => store);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [shopSelections, setShopSelections] = useState<
    Array<OrderShopDropdownSelection>
  >([]);
  const [shopIdsToSelection, setShopIdsToSelection] =
    useState<OrderShopIdsToDropdownSelection>({});

  // functions
  const handleSelectShop = (value: string | null) => {
    if (value === order.shop?.name) return;
    if (!value) {
      resetOrder();
      return;
    }
    setShop(shopIdsToSelection[value]);
  };

  // setup
  useEffect(() => {
    const initializeData = async () => {
      try {
        const responseShops: Array<OrderShop> = await fakeApiGetShops();
        if (responseShops.length === 0) return;
        const shopSelections: Array<OrderShopDropdownSelection> =
          getShopSelections(responseShops);
        const shopIdsToSelections: OrderShopIdsToDropdownSelection =
          getShopIdsToSelection(shopSelections);
        setShopSelections(shopSelections);
        setShopIdsToSelection(shopIdsToSelections);
        if (order.shop === null) setShop(shopSelections[0]);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setIsLoadingScreen(false);
      }
    };
    initializeData();
  }, []);

  // render
  return isLoadingScreen ? (
    <Loading />
  ) : (
    <MainView>
      <View style={{ ...globalStyles.containerAlignTopLeft, gap: 20 }}>
        <View>
          <Text style={{ marginBottom: 10, color: "#ffffff" }}>
            Select Shop
          </Text>
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#96a6ad",
              borderRadius: 2,
              backgroundColor: "#ffffff",
            }}
          >
            <RNPickerSelect
              onValueChange={(value) => handleSelectShop(value)}
              items={shopSelections}
              value={order.shop?.value}
              placeholder={{
                value: null,
                label: "Select any shop...",
                color: "rgba(0, 0, 0, 0.3)",
              }}
              style={{ placeholder: { color: "rgba(0, 0, 0, 0.7)" } }}
            />
          </View>
        </View>
        <BtnMain
          name="Next"
          disabled={order.shop === null}
          onPress={() =>
            navigation.navigate(screenNavigations.products.route as never)
          }
        />
      </View>
    </MainView>
  );
}
