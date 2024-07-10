import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
// Define chessboard dimensions and styling constants
const SQUARE_SIZE = 40;
const BOARD_SIZE = 8 * SQUARE_SIZE;

// Define chessboard colors
const LIGHT_SQUARE_COLOR = '#f0d9b5';
const DARK_SQUARE_COLOR = '#b58863';

const Chessboard = ({boardState}) => {
  // Generate chessboard squares
  const renderSquares = () => {
    const squares = [];
    // Iterate over rows and columns to create squares
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareColor = (row + col) % 2 === 0 ? LIGHT_SQUARE_COLOR : DARK_SQUARE_COLOR;
        const imageChosen = boardState[row][col]
        //console.log(imageChosen)
        let pieceImage = ''
        const imageExists = imageChosen === null ? false : true 
        if (imageExists) {
          switch (imageChosen[0]) {
            case 'br': pieceImage = require('./br.png'); break;
            case 'bn': pieceImage = require('./bn.png'); break;
            case 'bb': pieceImage = require('./bb.png'); break;
            case 'bq': pieceImage = require('./bq.png'); break;
            case 'bk': pieceImage = require('./bk.png'); break;
            case 'bp': pieceImage = require('./bp.png'); break;
            case 'wr': pieceImage = require('./wr.png'); break;
            case 'wn': pieceImage = require('./wn.png'); break;
            case 'wb': pieceImage = require('./wb.png'); break;
            case 'wq': pieceImage = require('./wq.png'); break;
            case 'wk': pieceImage = require('./wk.png'); break;
            case 'wp': pieceImage = require('./wp.png'); break;
          }
        } 
        const labFirst = col === 0 ? true : false
        const labLast = col === 7 ? true : false
        squares.push(
          // <HorizontalLayout>
          // { labFirst && <View style={styles.verLabel}>{row+1}</View> }
          <TouchableOpacity key={`${row}-${col}`} style={[styles.square, { backgroundColor: squareColor }]}>
              {imageExists && <Image source={pieceImage} style={styles.piece} />}
          </TouchableOpacity>
          // { labLast && <View style={styles.verLabel}>{row+1}</View> }
          // </HorizontalLayout>
        );
      }
    }
    return squares;
  };

  return (
    <>
    {/* <HorizontalLayout style={styles.horLabel}>
      <View style={styles.label}>A</View>
      <View style={styles.label}>B</View>
      <View style={styles.label}>C</View>
      <View style={styles.label}>D</View>
      <View style={styles.label}>E</View>
      <View style={styles.label}>F</View>
      <View style={styles.label}>G</View>
      <View style={styles.label}>H</View>
    </HorizontalLayout> */}
    <View style={styles.board}>
      {renderSquares()}
    </View>
    {/* <HorizontalLayout style={styles.horLabel}>
    <View style={styles.label}>A</View>
    <View style={styles.label}>B</View>
    <View style={styles.label}>C</View>
    <View style={styles.label}>D</View>
    <View style={styles.label}>E</View>
    <View style={styles.label}>F</View>
    <View style={styles.label}>G</View>
    <View style={styles.label}>H</View>
  </HorizontalLayout> */}
  </>
  );
};

// Styles for the chessboard and squares
const styles = StyleSheet.create({
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },
  label: {
    width: SQUARE_SIZE,
    paddingLeft:15
  },
  verLabel: {
    height: SQUARE_SIZE,
    paddingTop:15,
    paddingRight:15
  },
  horLabel: {
    width: SQUARE_SIZE*8,
    justifyContent: 'center',
  },
  piece: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensure the piece image fits inside the square
  },
});

export default Chessboard;
