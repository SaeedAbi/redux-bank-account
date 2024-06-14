import {combineReducers, createStore} from "redux";

const initialState={
    balance:0,
    loan:0,
    loanPurpose:"",
}

const initialStateCustomer={
    fullName:'',
    nationalID:'',
    createdAT:''
}

function accountReducer(state = initialState,action){
switch (action.type){
    case "account/deposit":
        return{...state, balance: state.balance+action.payload}
    case "account/withdraw":
        return{...state, balance: state.balance-action.payload}
    case "account/requestLoan":
        if(state.loan>0)return state
        return {...state,loan: action.payload.amount,loanPurpose: action.payload.purpose,balance: state.balance+action.payload.amount}
    case "account/payLoan":
        return {...state,loan: 0,loanPurpose: "",balance: state.balance-state.loan}
    default:
        return state
}
}

function customerReducer(state=initialStateCustomer,action){
    switch (action.type){
        case 'customer/createCustomer':
            return{...state,fullName: action.payload.fullName,nationalID: action.payload.nationalID,createdAT: action.payload.createdAT}
        case 'customer/updateName':
            return {...state,fullName: action.payload.fullName}
        default:
            return state
    }
}

const rootReducer=combineReducers({
    account:accountReducer,
    customer:customerReducer,
})
const store= createStore(rootReducer)

// store.dispatch({type:'account/deposit',payload:500})
// console.log(store.getState())
// store.dispatch({type:'account/withdraw',payload:200})
//
// store.dispatch({type:"account/requestLoan",payload:{amount:1000,purpose:'Buy a car'}})
// console.log(store.getState())
//
// store.dispatch({type:"account/payLoan"})

function deposit(amount){
    return {type:'account/deposit',payload:amount}
}
function withdraw(amount){
    return {type:'account/withdraw',payload:amount}
}
function requestLoan(amount,purpose){
    return {
        type:'account/requestLoan',
        payload:{amount,purpose}
    }
}
function payLoan(){
    return {type:'account/payLoan',}
}

store.dispatch(deposit(500))
console.log(store.getState())

function createCustomer(fullName,nationalID){
    return {type:'customer/createCustomer',payload:{fullName,nationalID,createdAT:new Date().toISOString()}}
}

function updateName(fullName){
    return {type:'account/updateName',payload:fullName}
}
store.dispatch(createCustomer('saeed abdary','2323345'))
console.log(store.getState())