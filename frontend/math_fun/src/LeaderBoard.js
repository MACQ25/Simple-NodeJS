import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * StAuth10244: I Mauricio Canul, 000881810 certify that this material is my original 
 * work. No other person's work has been used without due acknowledgement. I have not 
 * made my work available to anyone else.
 */

function LeaderBoard(props){
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Latest wins:</Text>
            {props.board.map((val, ind) => { return( <Text key={ind} style={styles.entry}>{ind + 1}.- {val}</Text> )})}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 1,
      margin: 10,
    },
    header: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: 5,
    },
    entry: {
        padding: 5,
        paddingLeft: 8,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
    }
});

export { LeaderBoard };