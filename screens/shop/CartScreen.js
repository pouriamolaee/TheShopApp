import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../contants/Colors';
import Card from '../../components/UI/Card';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                pushToken: state.cart.items[key].pushToken,
            });
        };
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    
    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
        props.navigation.goBack();
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    title="Order Now"
                    loading={isLoading}
                    buttonStyle={styles.btn}
                    disabled={cartItems.length === 0}
                    onPress={sendOrderHandler}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(removeFromCart(itemData.item.productId));
                        }}
                    />
                }
            />
        </View>
    );
};

export const screenOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary
    },
    btn: {
        width: 95,
        backgroundColor: Colors.accent
    }
});

export default CartScreen;