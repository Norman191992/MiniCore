import React, { useState, useEffect } from "react";
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

import {
  selectFechaCompra,selectPaseRestantes,selectTipoPase,selectCupo,selectValorPase} from '../slices/paseData'
  import { useDispatch ,useSelector} from 'react-redux';


export default function Expiradas({ route }) {
  const [mesesTranscurridos, setMesesTranscurridos] = useState(0);
  const [fecha, setFecha] = useState("");
  const tipoPase = useSelector(selectTipoPase);
  const FechaCompra = useSelector(selectFechaCompra);
  const pasesRestantes = useSelector(selectPaseRestantes);
  const cupo = useSelector(selectCupo);
  useEffect(() => {
    fechaExpiracion();
 }, []);


  function fechaExpiracion() {
    var fCompra = FechaCompra;

    var mes = fCompra.substr(5, 2);
    var anio = fCompra.substr(0, 4);
    var dia = fCompra.substr(9, 2);

    var mesesPase;
    if (tipoPase == "Semestral") {
      mesesPase = 6;
    } else if (tipoPase == "Mensual") {
      mesesPase = 1;
    } else {
      mesesPase = 12;
    }

    var res;
    var today = new Date();
    var mesActual = today.getMonth() + 1;

    setMesesTranscurridos(mesActual - mes);

    if (mesesPase == 12) {
      anio = anio + 1;
    } else {
      mes = parseInt(mes) + parseInt(mesesPase);
    }

    // console.log("mesActual: "+mesActual);

    setFecha(anio + "/" + mes + "/" + dia);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/*<Text style={styles.titulo}>Suscripción de pases</Text>*/}

        <View style={styles.containerCantidad}>
          <Text style={styles.subtitulo}>Usuario</Text>
          <Text style={styles.subText}>{route.params.user["nombre"]}</Text>
          <Text style={styles.subtitulo}>Tipo De Pase</Text>
          <Text style={styles.subText}>
            {tipoPase}
          </Text>
          <Text style={styles.subtitulo}>Fecha De Compra</Text>
          <Text style={styles.subText}>
            {FechaCompra}
          </Text>
        </View>

        <View style={styles.containerCantidad}>
          <Text style={styles.subtitulo}>Fecha Expiración</Text>
          <Text style={styles.subText}>{fecha}</Text>
          <Text style={styles.subtitulo}>Meses Transcurridos</Text>
          <Text style={styles.subText}>{mesesTranscurridos}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  subText: {
    backgroundColor: "#E2DCD6",
    height: 50,
    textAlignVertical: "center",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  containerCantidad: {
    padding: 50,
    borderColor: "#ffd869",
    borderWidth: 1,
    margin: 10,
    marginBottom: 50,
    borderRadius: 25,
  },
  titulo: {
    marginTop: "15%",
    marginBottom: "15%",
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 20,
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
  },
});
