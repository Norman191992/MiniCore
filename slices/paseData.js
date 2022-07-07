import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    fechaCompra:null,
    tipoPase:null,
    pasesRestantes:null,
    cupo:null, 
    valorPase:null
}


export const paseData = createSlice({
    name:'pase',
    initialState,
    reducers:{
        setFechaCompra:(state,action)=>{
            state.fechaCompra = action.payload;
        },
        setTipoPase:(state,action)=>{
            state.tipoPase = action.payload;
        },
        setPaseRestantes:(state,action)=>{
            state.pasesRestantes = action.payload;
        },
        setCupo:(state,action)=>{
            state.cupo = action.payload;
        },
        setValorPase:(state,action)=>{
            state.valorPase = action.payload;
        }
    }
});

export const {setFechaCompra,setPaseRestantes,setTipoPase,setCupo,setValorPase} = paseData.actions;

export const selectFechaCompra = (state)=>state.pase.fechaCompra;
export const selectPaseRestantes = (state)=>state.pase.pasesRestantes;
export const selectTipoPase = (state)=>state.pase.tipoPase;
export const selectCupo = (state)=>state.pase.cupo;
export const selectValorPase = (state)=>state.pase.valorPase;

export default paseData.reducer