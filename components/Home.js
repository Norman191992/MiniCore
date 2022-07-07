import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Pressable,
  LogBox,
} from "react-native";
import { ScrollView } from "react-native";
import Comprar from "./Comprar";
import {
  selectFechaCompra,selectPaseRestantes,selectTipoPase,selectCupo,selectValorPase} from '../slices/paseData'
  import { useDispatch ,useSelector} from 'react-redux';

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function Home({ navigation, route }) {

  const tipoPase = useSelector(selectTipoPase);
  const FechaCompra = useSelector(selectFechaCompra);
  const pasesRestantes = useSelector(selectPaseRestantes);
  const cupo = useSelector(selectCupo);


  const Separator = () => <View style={styles.separator} />;
  const SeparatorVisible = () => <View style={styles.separatorVisible} />;
  const logOut = () => {
    navigation.navigate("Login");
    route.params.logOut();
  };

  return (
    <ScrollView>
      <View style={styles.salirContainer}>
        <Button title="Salir" color={"#1e1e1e"} onPress={() => logOut()} />
      </View>
      <View style={styles.container}>
        <Text style={styles.titulo}>Pases</Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.btn]}
            onPress={() => Alert.alert("Button with adjusted color pressed")}
          >
            <Text style={styles.txtBtnLogin}>Activas</Text>
          </Pressable>
          <SeparatorVisible />
          <Pressable
            style={[styles.btn]}
            onPress={() =>
              navigation.navigate("Expiradas", { user: route.params.user })
            }
          >
            <Text style={styles.txtBtnLogin}>Expiradas</Text>
          </Pressable>
        </View>

        <View style={styles.paseContainer}>
          <Text style={styles.paseTitle}>Tipo</Text>
          <Text style={styles.paseMembers}>{tipoPase}</Text>
          <Text style={styles.paseTitle}>Fecha Compra</Text>
          <Text style={styles.paseMembers}>
            {FechaCompra}
          </Text>
          <Text style={styles.paseTitle}>Pases Restantes</Text>
          <Text style={styles.paseMembers}>
            {pasesRestantes}
          </Text>
          <Text style={styles.paseTitle}>Cupo Disponible</Text>
          <Text style={styles.paseMembers}>{cupo}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.btn, { backgroundColor: "#9EA93F" }]}
            onPress={() => {
              navigation.navigate("CambiarSuscripcion", {
                user: route.params.user,
                actualizar: route.params.setuser,
              });
            }}
          >
            <Text style={styles.btntext}>Comprar Nueva</Text>
          </Pressable>
          <Separator />
          <Pressable
            style={[styles.btn, { backgroundColor: "#E49273" }]}
            onPress={() => {
              navigation.navigate("Comprar", { user: route.params.user });
            }}
          >
            <Text style={styles.btntext}>Gastar</Text>
          </Pressable>
        </View>
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
  paseContainer: {
    width: "85%",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#EEC643",
  },
  paseMembers: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    fontSize: 19,
    fontWeight: "400",
  },
  paseTitle: {
    fontWeight: "bold",
    paddingLeft: 15,
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: "7%",
    paddingHorizontal: "10%",
    paddingVertical: "3%",
    alignItems: "stretch",
    borderRadius: 15,
  },
  titulo: {
    marginBottom: "3%",
    fontSize: 40,
    fontWeight: "bold",
  },
  separatorVisible: {
    marginHorizontal: 10,
    width: 1,
    height: "100%",
    borderColor: "#00000",
    borderWidth: 0.5,
  },
  separator: {
    marginHorizontal: 10,
  },
  salirContainer: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    paddingTop: "15%",
    marginLeft: "3%",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  btntext: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  txtBtnLogin: {
    fontSize: 18,
    color: "#000000",
  },
});
