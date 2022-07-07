import react, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {setFechaCompra,setPaseRestantes,setTipoPase,setCupo,setValorPase} from '../slices/paseData'
import { useDispatch } from 'react-redux';
import {selectFechaCompra,selectPaseRestantes,selectTipoPase,selectCupo,selectValorPase} from '../slices/paseData'
  import {useSelector} from 'react-redux';

var pases = [{tipoPase:'Mensual',cupo:'25',pasesRestantes:96,fechaCompra:'1990-01-01',valorPase:'0.09'}, 
{tipoPase:'Semestral',cupo:'50',pasesRestantes:576,fechaCompra:'1990-01-01',valorPase:'0.26'}, 
{tipoPase:'Anual',cupo:'80',pasesRestantes:1052,fechaCompra:'1990-01-01',valorPase:'0.08'}];

export default function Suscripcion({ route }) {
  const dispatch = useDispatch();
  function comprar(tipo) {
    var fech = new Date();
    let mes = fech.getMonth();
    let dia = fech.getDay();
    if(mes<9){
      mes = "0"+mes;
    }
    if(dia<9){
      dia = "0"+dia;
    }
    let fecha = fech.getFullYear()+'-'+mes+'-'+dia;
    let pase = null;
    if(tipo=="Mensual"){
      pase =  pases[0];
    }else if (tipo =="Semestral"){
      pase =  pases[1];
    }else if(tipo =="Anual"){
      pase =  pases[2];
    }
    pase.fechaCompra = fecha;
    route.params.user.pase = pase;
    dispatch(setFechaCompra(pase.fechaCompra))
    dispatch(setTipoPase(pase.tipoPase))
    dispatch(setCupo(pase.cupo))
    dispatch(setPaseRestantes(pase.pasesRestantes))
    dispatch(setValorPase(pase.valorPase))
    Alert.alert("Cambio aplicado","Tu nuevo pase es " + route.params.user.pase.tipoPase);
  }

  return (
    <View>
      <View style={styles.container}>
      <Text style={styles.titulo}>Escoje tu nueva suscripcion</Text>
        <Pressable style={[styles.paseContainer,{backgroundColor:"#256164"}]} 
          onPress={() => {comprar("Mensual")}}>
            <Text style={styles.paseTitle}>Mensual</Text>
            <Text style={styles.paseTitle}>Cantidad de pases 96</Text>
            <Text style={styles.paseTitle}>Cupo 25$</Text>
        </Pressable>

        <Pressable style={[styles.paseContainer,{backgroundColor:"#e88100"}]} 
          onPress={() => {comprar("Semestral")}}>
            <Text style={styles.paseTitle}>Semestral</Text>
            <Text style={styles.paseTitle}>Cantidad de pases 576</Text>
            <Text style={styles.paseTitle}>Cupo 50$</Text>
        </Pressable>

        <Pressable style={[styles.paseContainer,{backgroundColor:"#ecb223"}]} 
          onPress={() => {comprar("Anual")}}>
            <Text style={styles.paseTitle}>Anual</Text>
            <Text style={styles.paseTitle}>Cantidad de pases 1052</Text>
            <Text style={styles.paseTitle}>Cupo 80$</Text>
        </Pressable>
          
        </View>

        <Pressable style={[styles.btnLogin]}
        onPress={() => comprar()}>
          <Text
            style={styles.txtBtnLogin}>
            Comprar
          </Text>
        </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  paseContainer: {
    width: "85%",
    borderRadius: 20,
    padding:20,
    backgroundColor: "#EEC643",
    margin: 20
  },paseTitle:{
    fontWeight:"bold",
    paddingLeft:15,
    fontSize:20,
    color:"#fff"
  },
  containerSelect: {
    padding: 60,
    borderColor: "#E2DCD6",
    backgroundColor: "#ffd869",
    borderWidth: 1,
    margin: 10,
    marginBottom: 50,
    marginTop: 40,
    borderRadius: 25,
  },
  containerCantidad: {
    padding: 40,
    borderColor: "#ffd869",
    borderWidth: 1,
    margin: 10,
    marginBottom: 50,
    borderRadius: 25,
  },
  titulo: {
    marginTop: "8%",
    marginBottom: "5%",
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    borderRadius: 25,
  },
  input: {
    borderRadius: 25,
    width: 200,
    textAlign: "center",
    height: 50,
    backgroundColor: "#262626",
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 5,
    marginLeft: -5,
    marginBottom: 40,
    color: "#fff3bc",
    paddingHorizontal: 20,
  },
  btnLogin: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
    backgroundColor: "#ff8637",
    marginBottom: 50,
  },
  txtBtnLogin: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f6f6f6",
  },
});

{
  /* <SelectDropdown
            data={tipos}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          /> */
}
