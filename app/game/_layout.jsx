import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Chessboard from './ChessBoard';
import { useState, useEffect } from 'react'

const GameScreen = () => {
  const [startPosition, setStartPosition] = useState('');
  const [endPosition, setEndPosition] = useState('');
  // let currBoardState = [
  //   [['br', 7, 7], ['bn', 5, 5], ['bb', 5, 5], ['bq', 9, 9], ['bk', 4, 11], ['bb', 5, 5], ['bn', 5, 5], ['br', 7, 7]],
  //   [['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2]],
  //   [null,null,null,null,null,null,null,null],
  //   [null,null,null,null,null,null,null,null],
  //   [null,null,null,null,null,null,null,null],
  //   [null,null,null,null,null,null,null,null],
  //   [['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2]],
  //   [['wr', 7, 7], ['wn', 5, 5], ['wb', 5, 5], ['wq', 9, 9], ['wk', 4, 11], ['wb', 5, 5], ['wn', 5, 5], ['wr', 7, 7]]
  // ]
  const [currBoardState, setCurrBoardState] = useState(
    [
      [['br', 7, 7], ['bn', 5, 5], ['bb', 5, 5], ['bq', 9, 9], ['bk', 4, 11], ['bb', 5, 5], ['bn', 5, 5], ['br', 7, 7]],
      [['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2], ['bp', 2, 2]],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2], ['wp', 2, 2]],
      [['wr', 7, 7], ['wn', 5, 5], ['wb', 5, 5], ['wq', 9, 9], ['wk', 4, 11], ['wb', 5, 5], ['wn', 5, 5], ['wr', 7, 7]]
    ]
  )

  //STILL NEED TO DO THE FOLLOWING:
  //CREATE RANDOM BLACK MOVES
  //UPDATE THE WHITEKING AND BLACKKING USESTATE FIELDS
  //FIX LONGASS METHODS
  const [whiteKing, setWhiteKing] = useState([7,4])
  const [blackKing, setBlackKing] = useState([0,4])
  const KING_DIRECTIONS = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
  const QUEEN_DIRECTIONS = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
  const BISHOP_DIRECTIONS = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
  const ROOK_DIRECTIONS = [[1, 0], [-1, 0]]
  const KNIGHT_DIRECTIONS = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-2, 1], [-2, -1], [-1, -2]]
  const PAWN_DIRECTIONS = [[-1, 0], [-2, 0], [-1, 1], [-1, -1]]

  const handleSubmit = () => {
    // Logic to handle move submission based on startPosition and endPosition
    console.log(`Move from ${startPosition} to ${endPosition}`);
    //isValidWhitePawnMove(convertSymbolToPair(startPosition), convertSymbolToPair(endPosition))
    //implement health points logic
    let startPos = convertSymbolToPair(startPosition)
    let endPos = convertSymbolToPair(endPosition)
    let piece = [...currBoardState[startPos[0]][startPos[1]]]
    let pieceColor = piece[0][0]
    let pieceType = piece[0][1]
    let validMove = false
    switch (pieceType) {
      case 'r': validMove = isValidRookMove(startPos, endPos); break;
      case 'n': validMove = isValidKnightMove(startPos, endPos); break;
      case 'b': validMove = isValidBishopMove(startPos, endPos); break;
      case 'q': validMove = isValidQueenMove(startPos, endPos); break;
      case 'k': validMove = isValidKingMove(startPos, endPos); break;
      case 'p': validMove = isValidWhitePawnMove(startPos, endPos); break; //may have to redo for black pieces
    }
    let newBoardState = currBoardState.map(innerBS => [...innerBS])
    if (validMove) {
      //let newBoardState = JSON.parse(JSON.stringify(currBoardState)) //this does deep copy hopefully
      if (currBoardState[endPos[0]][endPos[1]] === null ) {
        newBoardState[startPos[0]][startPos[1]] = null
        newBoardState[endPos[0]][endPos[1]] = [...piece]
      }
      else {
        //rules for health points
        if (currBoardState[endPos[0]][endPos[1]] !== null ) { //there is a piece there
          let finalPiece = [...currBoardState[endPos[0]][endPos[1]]]
          if (finalPiece[0][0] !== piece[0][0]) {
            if (piece[1] >= finalPiece[2]) {
              newBoardState[startPos[0]][startPos[1]] = null
              piece[2] = piece[2] + parseInt(finalPiece[2]/2)
              newBoardState[endPos[0]][endPos[1]] = [...piece]
            }
            else {
              finalPiece[2] = finalPiece[2] - piece[1]
              newBoardState[endPos[0]][endPos[1]] = [...finalPiece]
            }
          }
        }
      }
      newBoardState = checkForChecks(whiteKing, newBoardState)
      newBoardState = checkForChecks(blackKing, newBoardState)
      setCurrBoardState(newBoardState)
    }
  };

  const checkForChecks = (king_pos, newBoardState) => {
    //check 8 directions + knights locations
    //straight up (-1, 0) --> goes from row 0 to (row of king-1)
    let piece = currBoardState[king_pos[0]][king_pos[1]]
    let myColor = piece[0]
    let row = king_pos[0]-1
    let col = king_pos[1]
    while (row >= 0) {
      if (currBoardState[row][col] !== null) {
        //queen, rook, pawn
        if (currBoardState[row][col][0][0] == myColor) {
          break;
        }
        else {
          if (currBoardState[row][col][0][1] == 'q' ||
            currBoardState[row][col][0][1] == 'r') {
              newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[row][col][1]
            }
        }
      }
      row = row - 1
    }
    //straight down (1, 0) --> goes from (row of king+1) to row 7
    row = king_pos[0]+1
    col = king_pos[1]
    while (row <= 7) {
      if (currBoardState[row][col] !== null) {
        //queen, rook, pawn
        if (currBoardState[row][col][0][0] == myColor) {
          break;
        }
        else {
          if (currBoardState[row][col][0][1] == 'q' ||
            currBoardState[row][col][0][1] == 'r') {
              newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[row][col][1]
            }
        }
      }
      row = row + 1
    }
    //straight right (0, 1) --> goes from (col of king+1) to col 7
    row = king_pos[0]
    col = king_pos[1]+1
    while (col <= 7) {
      if (currBoardState[row][col] !== null) {
        //queen, rook
        if (currBoardState[row][col][0][0] == myColor) {
          break;
        }
        else {
          if (currBoardState[row][col][0][1] == 'q' ||
            currBoardState[row][col][0][1] == 'r') {
              newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[row][col][1]
            }
        }
      }
      col = col + 1
    }
    //straight left (0, -1) --> goes from (col of king-1) to col 0
    row = king_pos[0]
    col = king_pos[1]-1
    while (col >= 0) {
      if (currBoardState[row][col] !== null) {
        //queen, rook
        if (currBoardState[row][col][0][0] == myColor) {
          break;
        }
        else {
          if (currBoardState[row][col][0][1] == 'q' ||
            currBoardState[row][col][0][1] == 'r') {
              newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[row][col][1]
            }
        }
      }
      col = col - 1
    }
    // diagonal upright (-1, 1)
    row = king_pos[0]-1
    col = king_pos[1]+1
    while (row  >= 0 && col <= 7) {
      if (currBoardState[row][col] !== null) {
        //queen, bishop
        if (currBoardState[row][col][0][0] == myColor) {
          break;
        }
        else {
          if (currBoardState[row][col][0][1] == 'q' ||
            currBoardState[row][col][0][1] == 'b' ||
            (currBoarddtate[row][col][0][1] == 'p' && myColor == 'w' && Math.abs(king_pos[0]-row) == 1)) {
              newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[row][col][1]
            }
        }
      }
      row = row - 1
      col = col + 1
    }

    // diagonal upleft (-1, -1)

    row = king_pos[0]-1
    col = king_pos[1]-1
    while (row  >= 0 && col >= 0) {
      if (currBoardState[row][col] !== null) {
        //queen, bishop
        if (currBoardState[row][col][0][0] == myColor) {
          break;
        }
        else {
          if (currBoardState[row][col][0][1] == 'q' ||
            currBoardState[row][col][0][1] == 'b' ||
            (currBoarddtate[row][col][0][1] == 'p' && myColor == 'w' && Math.abs(king_pos[0]-row) == 1)) {
              newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[row][col][1]
            }
        }
      }
      row = row - 1
      col = col - 1
    }

    // diagonal downright (1, 1)

    row = king_pos[0]+1
    col = king_pos[1]+1
    while (row <= 7 && col <= 7) {
      if (currBoardState[row][col] !== null) {
        //queen, bishop
        if (currBoardState[row][col][0][0] == myColor) {
          break;
        }
        else {
          if (currBoardState[row][col][0][1] == 'q' ||
            currBoardState[row][col][0][1] == 'b' ||
            (currBoardState[row][col][0][1] == 'p' && myColor == 'b' && Math.abs(king_pos[0]-row) == 1)) {
              newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[row][col][1]
            }
        }
      }
      row = row + 1
      col = col + 1
    }

    // diagonal downleft (1, -1)

    row = king_pos[0]+1
    col = king_pos[1]-1
    while (row <= 7 && col >= 0) {
      if (currBoardState[row][col] !== null) {
        //queen, bishop
        if (currBoardState[row][col][0][0] == myColor) {
          break;
        }
        else {
          if (currBoardState[row][col][0][1] == 'q' ||
            currBoardState[row][col][0][1] == 'b' ||
            (currBoardState[row][col][0][1] == 'p' && myColor == 'b' && Math.abs(king_pos[0]-row) == 1)) {
              newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[row][col][1]
            }
        }
      }
      row = row + 1
      col = col - 1
    }

    // handle knights behavior
    row = king_pos[0]
    col = king_pos[1]
    let possible_dirs = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-2, 1], [-2, -1], [-1, -2]]
    for (let i = 0; i < possible_dirs.length; i++) {
      let position = [row + possible_dirs[i][0], col + possible_dirs[i][1]]
      if (position[0] >= 0 && position[0] <= 7 && position[1] >= 0 && posiion[1] <= 7) {
        if (currBoardState[position[0]][position[1]][0][0] != myColor) {
          newBoardState[king_pos[0]][king_pos[1]][2] -=  currBoardState[position[0]][position[1]][1]
        }
      }
    }
    // UNSURE IF WE NEED THIS, WE WILL CHECK LATER
    // setCurrBoardState(newBoardState) 
  }

  const isValidWhitePawnMove = (start, end) => {
    let delta = [end[0]-start[0], end[1]-start[1]]
    let possible_dirs = [[-1, 0], [-2, 0], [-1, 1], [-1, -1]]
    //let possible_dirs = [[-1, 0], [-1, 1], [-1, -1]]
    console.log("this method runs")
    console.log("start: ", start)
    console.log("end: ", end)
    console.log(delta)
    //check boundary conditions:
    if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
      console.log("FALSE RETURNED 1")
      return false
    }
    let validDirection = false
    for (let i = 0; i < possible_dirs.length; i++) {
      if (delta[0] == possible_dirs[i][0] && delta[1] == possible_dirs[i][1]) {
        validDirection = true
      }
    }
    if (!validDirection) {
      console.log("FALSE RETURNED 2")
      return false
    }
    if (start[0] != 6 && (delta[0] == -2)) { //has moved
      console.log("FALSE RETURNED 3")
      return false
    }
    if (delta[0] == -1 && delta[1] == 1 && currBoardState[start[0]-1][start[1]+1] === null) {
      console.log("FALSE RETURNED 4")
      return false
    }
    if (delta[0] == -1 && delta[1] == -1 && currBoardState[start[0]-1][start[1]-1] === null) {
      console.log("FALSE RETURNED 5")
      return false
    }
    console.log("TRUE RETURNED")
    return true
  }

  const isValidBlackPawnMove = (start, end) => {
    let delta = [end[0]-start[0], end[1]-start[1]]
    let possible_dirs = [[1, 0], [2, 0], [1, 1], [1, -1]]
    //let possible_dirs = [[1, 0], [1, 1], [1, -1]]
    console.log("this method runs")
    console.log("start: ", start)
    console.log("end: ", end)
    console.log(delta)
    //check boundary conditions:
    if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
      console.log("FALSE RETURNED")
      return false
    }
    let validDirection = false
    for (let i = 0; i < possible_dirs.length; i++) {
      if (delta[0] == possible_dirs[i][0] && delta[1] == possible_dirs[i][1]) {
        validDirection = true
      }
    }
    if (!validDirection) {
      console.log("FALSE RETURNED")
      return false
    }
    if (start[0] != 1 && (delta[0] == 2)) { //has moved
      console.log("FALSE RETURNED")
      return false
    }
    if (delta[0] == 1 && delta[1] == 1 && currBoardState[start[0]+1][start[1]+1] === null) {
      console.log("FALSE RETURNED")
      return false
    }
    if (delta[0] == 1 && delta[1] == -1 && currBoardState[start[0]+1][start[1]-1] === null) {
      console.log("FALSE RETURNED")
      return false
    }
    console.log("TRUE RETURNED")
    return true
  }

  const isValidKnightMove = (start, end) => {
    let delta = [end[0]-start[0], end[1]-start[1]]
    let possible_dirs = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-2, 1], [-2, -1], [-1, -2]]
    console.log("this method runs")
    console.log("start: ", start)
    console.log("end: ", end)
    console.log(delta)
    //check boundary conditions:
    if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
      console.log("FALSE RETURNED")
      return false
    }
    for (let i = 0; i < possible_dirs.length; i++) {
      if (delta[0] == possible_dirs[i][0] && delta[1] == possible_dirs[i][1]) {
        console.log("TRUE RETURNED")
        return true
      }
    }
    console.log("FALSE RETURNED")
    return false    
  }

  const isValidRookMove = (start, end) => {
    console.log("this method runs")
    console.log("start: ", start)
    console.log("end: ", end)
    let delta = [end[0]-start[0], end[1]-start[1]]
    let possible_dirs = [[1, 0], [-1, 0]]
    //check boundary conditions:
    if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
      return false
    }
    if (delta[1] != 0) {
      return false
    }
    let mod_start = 0
    let mod_end = 0
    if (start[0] < end[0]) {
      mod_start = start[0]
      mod_end = end[0]
      console.log("option 1")
    }
    else {
      mod_start = end[0]
      mod_end = start[0]
      console.log("option 2")
      console.log("mode_start: ", mod_start)
      console.log("mode_end: ", mod_end)
    }

    for (let i = mod_start+1; i < mod_end; i++) {
      console.log("CBS:" , currBoardState[i][start[1]])
      if (currBoardState[i][start[1]] !== null) {
        console.log("FALSE RETURNED")
        return false
      }
    }
      return true
  }

  const isValidBishopMove = (start, end) => {
    let delta = [end[0]-start[0], end[1]-start[1]]
    let possible_dirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
    console.log("this method runs")
    console.log("start: ", start)
    console.log("end: ", end)
    console.log(delta)
    //check boundary conditions:
    if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
      return false
    }
    if (Math.abs(delta[0]) != Math.abs(delta[1])) {
      console.log("FALSE RETURNED NOT EQUAL")
      return false
    }
    let delta_constant = Math.abs(delta[0])
    let new_delta = [delta[0]/delta_constant, delta[1]/delta_constant]
    //check if new_delta is even in the list of possible directions
    console.log("new delta: ", new_delta)
    for (let i = 0; i < possible_dirs.length; i++) {
      if (new_delta[0] == possible_dirs[i][0] && new_delta[1] == possible_dirs[i][1]) {
        validDirection = true
      }
    }
    let new_start = [start[0]+new_delta[0], start[1]+new_delta[1]]
    if (validDirection) {
      while (new_start[0] != end[0]) {
        if (currBoardState[new_start[0]][new_start[1]] !== null) {
          console.log("FALSE RETURNED")
          return false
        }
        new_start = [new_start[0]+new_delta[0], new_start[1]+new_delta[1]]
      }
      console.log("TRUE RETURNED")
      return true
    }
    console.log("FALSE RETURNED")
    return false
  }


  const isValidQueenMove = (start, end) => {
    let delta = [end[0]-start[0], end[1]-start[1]]
    let possible_dirs = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
    console.log("this method runs")
    console.log("start: ", start)
    console.log("end: ", end)
    console.log(delta)
    //check boundary conditions:
    if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
      return false
    }
    if (delta[0] == 0 && delta[1] == 0) {
      return true
    }
    let delta_constant = delta[0] == 0 ? delta[1]: delta[0]
    delta_constant = Math.abs(delta_constant)
    let new_delta = [delta[0]/delta_constant, delta[1]/delta_constant]
    //check if new_delta is even in the list of possible directions
    let validDirection = false
    for (let i = 0; i < possible_dirs.length; i++) {
      if (new_delta[0] == possible_dirs[i][0] && new_delta[1] == possible_dirs[i][1]) {
        validDirection = true
      }
    }
    let new_start = [start[0]+new_delta[0], start[1]+new_delta[1]]
    if (validDirection) {
      while (new_start[0] != end[0]) {
        if (currBoardState[new_start[0]][new_start[1]] !== null) {
          console.log("FALSE RETURNED")
          return false
        }
        new_start = [new_start[0]+new_delta[0], new_start[1]+new_delta[1]]
      }
      console.log("TRUE RETURNED")
      return true
    }
    console.log("FALSE RETURNED")
    return false
  }

  const isValidKingMove = (start, end) => {
    let delta = [end[0]-start[0], end[1]-start[1]]
    let possible_dirs = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
    console.log("this method runs")
    console.log("start: ", start)
    console.log("end: ", end)
    console.log(delta)
    //check boundary conditions:
    if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
      console.log("FALSE RETURNED")
      return false
    }
    if (Math.abs(delta[0]) <= 1 && Math.abs(delta[1]) <= 1) {
      console.log("TRUE RETURNED")
      return true
    }
    console.log("FALSE RETURNED")
    return false
  }

  const convertSymbolToPair = (symbol) => {
    let num = 0
    switch (symbol[0].toLowerCase()) {
      case 'a': num = 0; break;
      case 'b': num = 1; break;
      case 'c': num = 2; break;
      case 'd': num = 3; break;
      case 'e': num = 4; break;
      case 'f': num = 5; break;
      case 'g': num = 6; break;
      case 'h': num = 7; break;
    }
    let val = num + (8*(8-Number(symbol[1])))
    return [parseInt(val/8),val%8]
  }

  const makeRandomBlackMoves = () => {
    //randomize which piece
    //randomize direction
    //randomize how many spaces it moves
    let locations = listBlackPieceLocations()
    let randomIndex = Math.floor(Math.random() * array.length)
    let randomLocation = locations[randomIndex]
  }

  const findPossibleMoves = (start) => {
    let piece = currBoardState[startPos[0]][startPos[1]]
    let pieceColor = piece[0][0]
    let pieceType = piece[0][1]
    let validMove = false
    switch (pieceType) {
      case 'r': validMove = isValidRookMove(startPos, endPos); break;
      case 'n': validMove = isValidKnightMove(startPos, endPos); break;
      case 'b': validMove = isValidBishopMove(startPos, endPos); break;
      case 'q': validMove = isValidQueenMove(startPos, endPos); break;
      case 'k': validMove = isValidKingMove(startPos, endPos); break;
      case 'p': validMove = isValidWhitePawnMove(startPos, endPos); break; //may have to redo for black pieces
    }
  }

  const findPossibleBlackPawnMoves = (start) => {
    
  }

  const findPossibleRookMoves = (start) => {


  }

  const findPossibleKnightMoves = (start) => {


  }

  const findPossibleBishopMoves = (start) => {


  }

  const findPossibleQueenMoves = (start) => {


  }

  const findPossibleKingMoves = (start) => {


  }



  const listBlackPieceLocations = () => {
    let locations = []
    for (let row = 0; row < 8; i++) {
      for (let col = 0; col < 8; i++) {
        if (currBoardState[row][col][0][0] == 'b') {
          locations.concat([row, col])
        }
      }
    }
    return locations
  }

  return (
    <View style={styles.container}>
      <Chessboard boardState={currBoardState}/>

      <View style={styles.inputContainer}>
        <Text>Start Position:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setStartPosition}
          value={startPosition}
          placeholder="e.g., e2"
        />
        <Text>End Position:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEndPosition}
          value={endPosition}
          placeholder="e.g., e4"
        />
        <Text onPress={() => handleSubmit({startPosition, endPosition})} style={styles.submitButton}>Submit Move</Text>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
});


export default GameScreen;
