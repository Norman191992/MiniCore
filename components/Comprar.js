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
//import { onChange } from "react-native-reanimated";
import {setFechaCompra,setPaseRestantes,setTipoPase,setCupo,setValorPase} from '../slices/paseData'
import {selectFechaCompra,selectPaseRestantes,selectTipoPase,selectCupo,selectValorPase} from '../slices/paseData'

import { useDispatch,useSelector } from 'react-redux';
//import SelectDropdown from "react-native-select-dropdown";
var tipos = ["Semestral", "Anual", "Mensual"];

export default function Comprar({ route }) {
  const dispatch = useDispatch();
  const [cantidadPases, setCantidadPases] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);

  const cupo = useSelector(selectCupo);
  const valorPase = useSelector(selectValorPase);

  function setValores(cPases){
    console.log("cPases: "+cPases);
    setCantidadPases(cPases);
    setCantidadTotal(route.params.user["pase"]["valorPase"] * cPases);
    setCupo(route.params.user["pase"]["cupo"]);
  }

  function comprar() {
    if(cantidadPases <= route.params.user["pase"]["pasesRestantes"]){
      let cup = cupo - (cantidadPases*valorPase);
      dispatch(setCupo(cup));
      let pas= route.params.user["pase"]["pasesRestantes"] - cantidadPases;
      dispatch(setPaseRestantes(pas))
      Alert.alert("Compra realizada exitosamente!");
    }else{
      Alert.alert("No tienes suficientes cupos para comprar estos pases!");
    }

  }

  const Separator = () => <View style={styles.separator} />;
  return (
    <ScrollView>
      <View style={styles.container}>
        {/*<Text style={styles.titulo}>Comprar Pases</Text>*/}

        <View style={styles.containerSelect}>
          <Text style={styles.subtitulo}>Cupo Disponible</Text>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}
          >
            {cupo}
          </Text>
        </View>

        <View style={styles.containerCantidad}>
          <Text style={[styles.subtitulo, { textAlign: "center" }]}>
            Cantidad
          </Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor={"#fff3bc"}
            style={styles.input}
            onChangeText={(text) => setValores(text)}
          />
          <Text style={{ textAlign: "center" }}>
            Precio Total Cupo:{" "}
            {cantidadTotal}
          </Text>
        </View>

        <Pressable style={[styles.btnLogin]}
        onPress={() => comprar()}>
          <Text
            style={styles.txtBtnLogin}>
            Comprar
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
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
    marginTop: "15%",
    marginBottom: "15%",
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
