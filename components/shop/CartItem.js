import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableNativeFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${Math.round(props.amount.toFixed(2) * 100) / 100}</Text>
                {props.deletable &&
                    <TouchableNativeFeedback onPress={props.onRemove} style={styles.deleteBtn}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={23}
                            color="red"
                        />
                    </TouchableNativeFeedback>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteBtn: {},
});