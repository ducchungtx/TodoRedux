import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStore } from 'redux';

// State - Lưu trữ tất cả các biến trong ứng dụng
let appState = { number: 1, histories: 1 };

// Action - Sự kiện do người dùng tương tác tạo ra
// Cong
const add = {
    type: 'ADD',
    value: 1
};
// Tru
const sub = {
    type: 'SUB',
    value: 1
};

// Reducer - là nơi tổng hợp dựa trên state và action để xử lý. Logic chính sẽ nằm ở đây
const numberReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            // imutable state
            const newValue = state.number + action.value;
            state = {
                ...state,
                histories: [...state.histories, newValue],
                number: newValue
            }
            break;
        case 'SUB':
            const newVal = state.number - action.value;
            state = {
                ...state,
                histories: [...state.histories, newVal],
                number: newVal
            }
            break;
    }
    return state;
}

// Store - là một điểm duy nhất trong ứng dụng. Có nghĩa chúng ta có nhiều action, reducer nhưng chúng ta
// chỉ có 1 Store mà thôi. Store này sẽ quản lý tất cả các biến của tất cả component trong ứng dụng của chúng ta
const store = createStore(numberReducer, appState);

// Test
// Chú ý subscribe phải đặt trước mới ra dữ liệu
store.subscribe( () => {
    console.log('State updated', store.getState());
} );

store.dispatch(add);
store.dispatch(add);
store.dispatch(add);

store.dispatch(sub);

store.dispatch( {
    type: 'ADD',
    value: 5
} );

const creatAddAction = (number) => {
    return { type: 'ADD', value: number };
}

store.dispatch(creatAddAction(100));