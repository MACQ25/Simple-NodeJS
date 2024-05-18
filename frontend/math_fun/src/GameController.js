import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LeaderBoard } from './LeaderBoard';

/**
 * StAuth10244: I Mauricio Canul, 000881810 certify that this material is my original 
 * work. No other person's work has been used without due acknowledgement. I have not 
 * made my work available to anyone else.
 */

function GameController(props){
    const [userAccount, setUserAccount] = useState("");
    const [userPass, setUserPass] = useState("");
    const [target1, setTarget1] = useState(1);
    const [target2, setTarget2] = useState(1);
    const [answer, setAnswer] = useState(1);
    const [playing, setPlaying] = useState(true);
    const [userAnswer, setUserAnswer] = useState(1);
    const [result, setResult] = useState(true);
    const [leaderBoard, setLeaderBoard] = useState([]);


    function genMath(){
        return Math.floor(1 + ((100 - 1) * Math.random()));
    }

    async function setNumbers(){
        let t1 = genMath();
        setTarget1(t1);
        let t2 = genMath();
        setTarget2(t2);
        setAnswer(t1 + t2);
    }

    useEffect(() => {
        setUserAccount(props.UserAccount);
        setUserPass(props.UserPass);
        setNumbers();
        setPlaying(true);
    }, []);

    async function postResults(data = {}){
        const url = 'http://10.128.7.104:3001/sendres';
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
        setLeaderBoard(fResp.leaderBoard);
        console.log(leaderBoard);
    }

    function submit(){
        setPlaying(false);
        if (answer == userAnswer){
            setResult(true);
            postResults({UN: userAccount, PW: userPass});
        } else setResult(false);
    }

    function reset(){
        setPlaying(true);
        setNumbers();
        setUserAnswer(0);
    }

    if(playing){
        return(
            <View>
                <Text style={styles.lettering}>What is the result of adding the next 2 numbers?</Text>
                <Text style={styles.lettering}>Number 1: {target1}</Text>
                <Text style={styles.lettering}>Number 2: {target2}</Text>
                <TextInput placeholder='Place your answer here' onChangeText={setUserAnswer} style={styles.answerBox}/>
                <Pressable onPress={submit} style={styles.actBtn}>
                    <Text style={styles.actBtnTxt}>
                        Submit answer
                    </Text>
                </Pressable>
            </View>
        )
    } else {
        return(
            <View>
                <View style={(result) ? styles.victory : styles.loss }>
                    <View style={styles.results}>
                        <Text style={styles.announcement}>{(result) ? "Success!" : "Failure!" }</Text>
                        <Text style={styles.lettering}>The answer is: {answer}</Text>
                        <Text>And you have said: {userAnswer}</Text>
                    </View>
                </View>
                <View>
                    <LeaderBoard board={leaderBoard}/>
                </View>
                <Pressable onPress={reset} style={styles.actBtn}>
                    <Text style={styles.actBtnTxt}>
                        Play again
                    </Text>
                </Pressable>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    results: {
        margin: 20,
    },
    victory: {
        borderRadius: 10,
        backgroundColor: 'lightgreen',
    },
    loss: {
        borderRadius: 10,
        backgroundColor: 'red',
    },
    announcement: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    lettering: {
        margin: 15,
        textAlign: 'center',
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
    answerBox:{
        alignSelf: 'center',
    },
  });

export { GameController }