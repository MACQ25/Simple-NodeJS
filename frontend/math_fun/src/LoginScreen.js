import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

/**
 * StAuth10244: I Mauricio Canul, 000881810 certify that this material is my original 
 * work. No other person's work has been used without due acknowledgement. I have not 
 * made my work available to anyone else.
 */

function LoginScreen({ navigation }) {
  
  const [userName, setUserName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState(false);

  async function loginUser(data = {}){
    const url = 'http://10.128.7.104:3001/login';
    const resp = await fetch(url, { 
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    const fResp = await resp.json();
    console.log(fResp);
    if(fResp.status === "success"){
      navigation.navigate(
        'Home',
        {
          userAccount: fResp.user,
          userPass: fResp.pass,
          session: true,
        }
      )
    } else setResponseMessage(true);
}

  return (
      <View style={styles.container}>
          <Text style={{color: 'red', display: (responseMessage) ? "flex" : "none"}}>Username and/or password incorrect</Text>
          <Text>Enter a username, letter casing will be ignored</Text>
          <TextInput 
              placeholder={"Username"}
              onChangeText={setUserName}
              style={styles.inputBox}
          />
          <Text>Enter a password</Text>
          <TextInput 
              placeholder={"Password"}
              onChangeText={setPassword}
              style={styles.inputBox}
          />
          <Pressable onPress={() => {loginUser({UN: userName, PW: userPassword})}} style={styles.actBtn}>
              <Text style={styles.actBtnTxt}>Login</Text>
          </Pressable>      
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actBtn: {
      alignSelf: 'center',
      backgroundColor: 'blue',
      borderRadius: 10,
      padding: 10,
      margin: 20,
      maxWidth: '40%',
    },
    actBtnTxt: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputBox: {
        margin: 15,
        padding: 5,
        borderColor: '#e6e6e6',
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        minWidth: '40%',
    },
  });

export { LoginScreen }
