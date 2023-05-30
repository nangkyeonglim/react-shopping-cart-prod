import { atom, selector, selectorFamily } from "recoil";
import { CartItem, ReceivedCartItem } from "../types/types";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const cartCountSelector = selector({
  key: "cartCountSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    return cartList.length;
  },
});

export const checkedCartSelector = selector({
  key: "checkedCartSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    const checkedCartLst = cartList.filter((cartItem) => cartItem.checked);
    return checkedCartLst;
  },
});

export const checkedCartCountSelector = selector({
  key: "checkedCartCountSelector",
  get: ({ get }) => {
    const checkedCartList = get(checkedCartSelector);
    return checkedCartList.length;
  },
});

export const allCartCheckedSelector = selector({
  key: "allCartCheckedSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    const cartCount = get(cartCountSelector);
    if (cartCount > 0) {
      const isAllCartItemChecked = cartList.every(
        (cartItem) => cartItem.checked
      );
      return isAllCartItemChecked;
    }

    return false;
  },
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const checkedCartList = get(checkedCartSelector);
    const totalPrice = checkedCartList.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
      0
    );
    return totalPrice;
  },
});

export const quantityByProductIdSelector = selectorFamily({
  key: "quantityByProductIdSelector",
  get:
    (productId: number) =>
    ({ get }) => {
      const cartList = get(cartState);
      const targetCart = cartList.find((cart) => cart.product.id === productId);
      return targetCart?.quantity ?? 0;
    },
});

export const switchCartCheckboxSelector = selector<number>({
  key: "switchCartCheckboxSelector",
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set: ({ get, set }, id) => {
    const cartList = [...get(cartState)];
    const targetIndex = cartList.findIndex(
      (cartItem) => cartItem.id === (id as number)
    );
    const targetCart = cartList[targetIndex];
    const updatedCart = {
      ...targetCart,
      checked: !targetCart.checked,
    };
    cartList[targetIndex] = updatedCart;
    set(cartState, cartList);
  },
});

export const switchAllCartCheckboxSelector = selector<undefined>({
  key: "switchAllCartCheckboxSelector",
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return undefined;
  },
  set: ({ get, set }) => {
    const cartList = [...get(cartState)];
    const isAllCartItemChecked = get(allCartCheckedSelector);
    const newCartList = cartList.map((cartItem: ReceivedCartItem) => ({
      ...cartItem,
      checked: !isAllCartItemChecked,
    }));
    set(cartState, newCartList);
  },
});
