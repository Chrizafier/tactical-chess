import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, DataTable, List } from 'react-native-paper';


const InstructionsModalContent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.largeText}>Instructions</Text>
        
        <Text style={styles.smallText}>
          The app follows the normal rules of chess, except for the following modifications:
        </Text>
        
        <Text style={[styles.smallText, styles.indentedText]}>
          1. Health and Attack Points: Each piece has a certain number of health points and attack points.
        </Text>
        <Text style={styles.smallText}>
          The larger the attack points, the more damage a piece can deal on the enemy. The larger the health points, the more damage a piece can take.
        </Text>
        <View style={styles.tableContainer}>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title><Text style={styles.tableHeaderText}>Piece</Text></DataTable.Title>
            <DataTable.Title numeric><Text style={styles.tableHeaderText}>Attack</Text></DataTable.Title>
            <DataTable.Title numeric><Text style={styles.tableHeaderText}>Health</Text></DataTable.Title>
          </DataTable.Header>
  
          <DataTable.Row style={styles.rowOdd}>
            <DataTable.Cell><Text style={styles.tableText}>Pawn</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>2</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>2</Text></DataTable.Cell>
          </DataTable.Row>
  
          <DataTable.Row style={styles.rowEven}>
            <DataTable.Cell><Text style={styles.tableText}>Knight or Bishop</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>5</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>5</Text></DataTable.Cell>
          </DataTable.Row>
  
          <DataTable.Row style={styles.rowOdd}>
            <DataTable.Cell><Text style={styles.tableText}>Rook</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>7</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>7</Text></DataTable.Cell>
          </DataTable.Row>
  
          <DataTable.Row style={styles.rowEven}>
            <DataTable.Cell><Text style={styles.tableText}>Queen</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>9</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>9</Text></DataTable.Cell>
          </DataTable.Row>
  
          <DataTable.Row style={styles.rowOdd}>
            <DataTable.Cell><Text style={styles.tableText}>King</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>4</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text style={styles.tableText}>11</Text></DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        </View>
        <Text style={styles.smallText}>
          2. Attacks occur when you attempt to move a piece into a space occupied by one of your opponent’s pieces. The only exception to this is when one of your pieces is in position to check your opponent’s king.
        </Text>
  
        <Text style={styles.smallText}>
          3. If you are trying to capture an opponent’s piece with fewer or the same number of health points than the piece you are using to attack, your piece will gain half of the points the opponent piece was originally worth, and the opponent piece will be captured.
        </Text>
  
        <Text style={styles.smallText}>
          4. If you are trying to capture an opponent’s piece with a greater number of health points than the piece you are using to attack, your piece will not lose or gain any health points, while the opponent piece will lose the number of health points equivalent to the capturing piece's attack points.
        </Text>
  
        <Text style={styles.smallText}>
          5. Castling and pawn promotion are NOT allowed, but all pieces move in the same ways as in normal chess.
        </Text>
  
        <Text style={styles.smallText}>
          6. Upon killing the opponent's king, the player wins and the game ends.
        </Text>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    table: {
      borderRadius: 25,
      backgroundColor: '#fc9c9c',
      paddingBottom: 20,
    },
    tableContainer: {
      paddingVertical: 30,
    },
    largeText: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: 'black',
      color: '#fb5b5a',
    },
    smallText: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 10,
      color: 'black',
    },
    indentedText: {
      marginLeft: 20,
    },
    tableHeaderText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    tableText: {
      fontSize: 14,
      color: 'black',
    },
    rowEven: {
      backgroundColor: '#fecdcd', // Alternate row background color
    },
    rowOdd: {
      backgroundColor: '#fee6e6', // Alternate row background color
    },
  });

export default InstructionsModalContent