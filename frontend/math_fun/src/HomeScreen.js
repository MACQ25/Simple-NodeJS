import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { GameController } from './GameController';

/**
 * StAuth10244: I Mauricio Canul, 000881810 certify that this material is my original 
 * work. No other person's work has been used without due acknowledgement. I have not 
 * made my work available to anyone else.
 */

function HomeScreen({ route, navigation }){

    const { userAccount, userPass, session } = route.params;

    if(session){
      return(
        <View style={styles.greaterContainer}>
          <View style={styles.credContainer}>
            <Text>Logged in as: {JSON.stringify(userAccount)}</Text>
          </View>
          <View style={styles.container}>
            <GameController UserAccount={userAccount} UserPass={userPass}/>
            <Pressable onPress={() => navigation.setParams({ userAccount: "Not logged in yet", userPass: "None", session: false })} style={styles.logout}>
              <Text style={styles.logoutTxt}>Log out</Text>
            </Pressable>
          </View>
        </View>

      );
    }
    else return (
        <View style={styles.container}>
          <Text style={styles.announcement}>Welcome to the fun math game!</Text>
          <Text>Login with your credentials</Text>
          <Pressable onPress={() => navigation.navigate('Login')} style={styles.loginBtn}>
            <Text style={styles.actBtnTxt}>Login</Text>
          </Pressable>
          <Text>Or set up an account if you dont have one yet</Text>
          <Pressable onPress={() => navigation.navigate('Sign Up')} style={styles.signUpBtn}>
            <Text style={styles.actBtnTxt}>Sign up</Text>
          </Pressable>
          <StatusBar style="auto" />
        </View>
      );
}

const styles = StyleSheet.create({
    greaterContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    credContainer: {
      display: 'flex',
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      textAlign: 'left',
      paddingLeft: 25,
      paddingTop: 20,
      paddingBottom: 15,
      backgroundColor: '#ff9933'
    },
    logout: {
      backgroundColor: 'crimson',
      borderRadius: 10,
      padding: 10,
      margin: 20,
      alignSelf: 'flex-end'
    },
    logoutTxt: {
      color: 'white',
      fontWeight: 'bold',
    },
    loginBtn: {
      alignSelf: 'center',
      backgroundColor: 'blue',
      borderRadius: 10,
      padding: 10,
      margin: 20,
      maxWidth: '40%',
    },
    signUpBtn: {
      alignSelf: 'center',
      backgroundColor: '#ff9900',
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
    announcement: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 15,
  },
  });

export {HomeScreen}; 
