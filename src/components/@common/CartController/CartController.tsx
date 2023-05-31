import { ChangeEvent } from 'react';
import type { ProductItem } from '../../../types/types';
import * as S from './CartController.style';
import { cartState, quantityByProductIdSelector } from '../../../recoil/cartAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchAddCart, fetchCartList, fetchDeleteCart, fetchUpdateCart } from '../../../api/api';
import { serverState } from '../../../recoil/serverAtom';

interface CartControllerProps {
  product: ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));
  const server = useRecoilValue(serverState);
  const [cartList, setCartList] = useRecoilState(cartState);

  const targetCartItem = cartList.find((cartItem) => cartItem.product.id === product.id);

  const addCartItem = async (productId: number) => {
    await fetchAddCart(server, productId);
    const newCartList = await fetchCartList(server);
    setCartList(newCartList);
  };

  const updateCartItemQuantity = async (newQuantity: number) => {
    if (targetCartItem) {
      const cartId = targetCartItem.id;
      if (newQuantity === 0) {
        if (confirm('정말로 삭제 하시겠습니까?')) {
          await fetchDeleteCart(server, cartId);
        }
      } else {
        await fetchUpdateCart(server, cartId, newQuantity);
      }
      const newCartList = await fetchCartList(server);
      setCartList(newCartList);
    }
  };

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityInputValue = Number(event.target.value.replaceAll('/', '').replace(/\D/g, ''));
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;

    updateCartItemQuantity(newQuantity);
  };

  return (
    <>
      {quantity > 0 ? (
        <S.ControllerWrapper>
          <S.CartBox>
            <S.QuantityControlButton onClick={() => updateCartItemQuantity(quantity - 1)}>-</S.QuantityControlButton>
            <S.QuantityInput value={quantity} onChange={handleChangeQuantity} />
            <S.QuantityControlButton onClick={() => updateCartItemQuantity(quantity + 1)}>+</S.QuantityControlButton>
          </S.CartBox>
        </S.ControllerWrapper>
      ) : (
        <S.AddCartButton
          onClick={() => {
            addCartItem(product.id);
          }}
        >
          장바구니에 담기
        </S.AddCartButton>
      )}
    </>
  );
}

export default CartController;
