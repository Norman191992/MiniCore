import React, { Component, useState, useEffect } from 'react';
import { Pressable, StyleSheet, TextInput, Text, View, Alert} from 'react-native';
import {setFechaCompra,setPaseRestantes,setTipoPase,setCupo,setValorPase} from '../slices/paseData'
import { useDispatch } from 'react-redux';


{/*----------Importamos los colores----------*/ }
import Colors from '../src/utils/colors';

{/*---------Exportamos el componente---------*/ }


export function Contenido(props){
    
    const dispatch = useDispatch();
    const [password,setPassword] = useState('');
    const [nombre,setNombre] = useState('');
    let usuarios = [
        {nombre:'EstefiR',clave:'estefi123',pase:{fechaCompra:'2022-03-01',tipoPase:'Semestral',pasesRestantes:576,cupo:'25', valorPase:'0.09'}},
        {nombre:'FrancisR',clave:'francis123',pase:{fechaCompra:'2022-03-03',tipoPase:'Mensual',pasesRestantes:25,cupo:'50', valorPase:'0.26'}},
        {nombre:'GustavoL',clave:'gustavo123',pase:{fechaCompra:'2022-04-01',tipoPase:'Anual',pasesRestantes:80,cupo:'80', valorPase:'0.0.08'}},
    ];

    function logIn(nombre,clave){
        const usuario = usuarios.find(u=> u.nombre == nombre && u.clave == clave);
        console.log(usuario.pase.tipoPase, usuario)
        dispatch(setFechaCompra(usuario.pase.fechaCompra))
        dispatch(setTipoPase(usuario.pase.tipoPase))
        dispatch(setCupo(usuario.pase.cupo))
        dispatch(setPaseRestantes(usuario.pase.pasesRestantes))
        dispatch(setValorPase(usuario.pase.valorPase))
        if(usuario==null){
            Alert.alert("Usuario no encontrado");
        }else{
            props.logUsuario(usuario);
        }
    }

    return(
        <>
            <View style = {styles.container}>
            <Text style={[styles.slogan, styles.titulo]}>INICIO</Text>
            <View style={styles.viewInputs}>
                
                {/* E-mail */}
                <TextInput placeholder="Nombre" placeholderTextColor={"#fff3bc"}
                onChangeText={text => setNombre(text)}
                 keyboardType="email-address" style={styles.input}/>

                {/* Password */}
                <TextInput name="cr" placeholder="Contraseña"  placeholderTextColor={"#fff3bc"}
                 onChangeText={text => setPassword(text)}
                style={styles.input}/>

                <Pressable style={styles.btnLogin} onPress={()=>logIn(nombre,password)} >
                    <Text style={styles.txtBtnLogin}>Ingresar</Text>
                </Pressable>

                <Pressable style={[styles.btnLogin,{backgroundColor:"#ff8637"}]} >
                    <Text style={styles.txtBtnLogin}>Registrarse</Text>
                </Pressable>                
            </View>
        </View>
        </>
    );

}

export default function Auth({navigation}) {

    const dispatch = useDispatch();
    const [logged,setLogged] = useState(false);
    const [usuario,setUsuario] = useState(null);
    useEffect(()=>{
        if(usuario!= null ){
            setLogged(true);
            dispatch(setTipoPase(usuario.pase.tipoPase))
        }else{
            setLogged(false);
        }
    });
    function logOut(){
        setLogged(false);
        setUsuario(null); 
    }

    return (
        <>
            {logged? navigation.navigate('Home',{logOut:logOut,user:usuario,setuser:setUsuario}) : <Contenido logUsuario ={setUsuario}></Contenido>}
        </>
        
    )
}

/*
display: "flex",
        marginTop:"60%",
        marginHorizontal:"15%",
*/

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:60
    },
    
    slogan:{
        textAlign:"center",
        bottom: "20%",
        fontFamily: "sans-serif-condensed",
        fontSize:20,
        color: "#fff",
        fontWeight: "bold",
        width: "133%",
    },

    titulo:{
          marginBottom:"3%", 
          marginTop:"40%",     
          fontSize:50,
          color:"#1e1e1e",
    },

    viewInputs: {
        alignItems: "center",
        width:"100%",
        bottom:"10%",
        right: "-2%"
    },

    input: {
        borderRadius:25,
        width:"100%",
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
    btnLogin:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'black',
    },
    txtBtnLogin:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    },
    txtRegistrarse:{
        fontSize: 16,
        color:"#000"
    },
    viewRegistrarse:{
        fontSize: 16,
        flexDirection: "row",

    },
    iniciarPress:{
        fontWeight: "bold",
    }
});