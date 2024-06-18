import {createSlice} from "@reduxjs/toolkit";
import {payLoan} from "../account/accountSlice";

const initialStateCustomer={
    fullName:'',
    nationalID:'',
    createdAT:''
}

const customerSlice=createSlice({
    name:"customer",
    initialState:initialStateCustomer,
    reducers:{
        createCustomer:{
            prepare(fullName,nationalID){
                return{
                    payLoad: {
                        fullName,
                        nationalID,
                        createdAT:new Date().toISOString(),
                    },
                }
            },
            reducer(state,action){
    state.fullName = action.payload.fullName
    state.nationalID = action.payload.nationalID
    state.createdAT = action.payload.createdAT
}
        },
        updateName(state,action){
            state.fullName=action.payload
        }
    }
})

export const {createCustomer,updateName}=customerSlice.actions

export default customerSlice.reducer