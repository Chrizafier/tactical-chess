import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Chessboard from './ChessBoard';
import { useState, useEffect } from 'react'

const KING_DIRECTIONS = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
const QUEEN_DIRECTIONS = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
const BISHOP_DIRECTIONS = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
const ROOK_DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]]
const KNIGHT_DIRECTIONS = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-2, 1], [-2, -1], [-1, -2]]
const PAWN_DIRECTIONS = [[-1, 0], [-2, 0], [-1, 1], [-1, -1]]

const GameScreen = () => {
  const [whiteKing, setWhiteKing] = useState([7,4])
  const [blackKing, setBlackKing] = useState([0,4])
  const [startPosition, setStartPosition] = useState('');
  const [endPosition, setEndPosition] = useState('');
  const [winner, setWinner] = useState('');
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

  const handleSubmit = () => {
    console.log(`Move from ${startPosition} to ${endPosition}`);
    //implement health points logic
    let startPos = convertSymbolToPair(startPosition)
    let endPos = convertSymbolToPair(endPosition)
    let piece = [...currBoardState[startPos[0]][startPos[1]]]
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
      newBoardState = playMoves(startPos, endPos)
      newBoardState = checkForChecks(whiteKing, newBoardState)
      newBoardState = checkForChecks(blackKing, newBoardState)
      setCurrBoardState(newBoardState)
      if (gameOver()) {
        return;
      }
    }

    newBoardState = makeRandomBlackMoves(newBoardState)
    newBoardState = checkForChecks(whiteKing, newBoardState)
    newBoardState = checkForChecks(blackKing, newBoardState)
    setCurrBoardState(newBoardState)
    if (gameOver()) {
      return;
    }
  };

  const gameOver = () => {
    if (currBoardState[whiteKing[0]][whiteKing[1]][2] <= 0) {
      setWinner('The computer won this board!')
      return true
    }
    if (currBoardState[blackKing[0]][blackKing[1]][2] <= 0) {
      setWinner('The user won this board!')
      return true
    }  
    return false
  }

  const checkForChecks = (king_pos, newBoardState) => {
    let piece = newBoardState[king_pos[0]][king_pos[1]]
    let myColor = piece[0]
    let oppColor = myColor == 'w' ? 'b' : 'w'
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (newBoardState[row][col] !== null && newBoardState[row][col][0][0] == oppColor) {
          if (newBoardState[row][col][0][1] == 'q' && isValidQueenMove([row, col], king_pos)) {
            newBoardState[king_pos[0]][king_pos[1]][0][2] -= currBoardState[row][col][1]
          }
          else if (newBoardState[row][col][0][1] == 'k' && isValidKnightMove([row, col], king_pos)) {
            newBoardState[king_pos[0]][king_pos[1]][0][2] -= currBoardState[row][col][1]
          }
          else if (newBoardState[row][col][0][1] == 'b' && isValidBishopMove([row, col], king_pos)) {
            newBoardState[king_pos[0]][king_pos[1]][0][2] -= currBoardState[row][col][1]
          }
          else if (newBoardState[row][col][0][1] == 'r' && isValidRookMove([row, col], king_pos)) {
            newBoardState[king_pos[0]][king_pos[1]][0][2] -= currBoardState[row][col][1]
          }
          else if (newBoardState[row][col][0][1] == 'p') {
            if (newBoardState[row][col][0][0] == 'w') { //white piece
              if ((row-king_pos[0]) == 1 && ((col-king_pos[1]) == 1 || (col-king_pos[1]) == -1)) {
                newBoardState[king_pos[0]][king_pos[1]][0][2] -= currBoardState[row][col][1]
              }
            }
            else { // black piece
              if ((row-king_pos[0]) == -1 && ((col-king_pos[1]) == 1 || (col-king_pos[1]) == -1)) {
                newBoardState[king_pos[0]][king_pos[1]][0][2] -= currBoardState[row][col][1]
              }
            }
          }
          else {}
        }
      }
    }

    return newBoardState
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
    let delta = [end[0]-start[0], end[1]-start[1]]
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
    for (let i = 0; i < ROOK_DIRECTIONS.length; i++) {
      if (new_delta[0] == ROOK_DIRECTIONS[i][0] && new_delta[1] == ROOK_DIRECTIONS[i][1]) {
        validDirection = true
      }
    }
    let new_start = [start[0]+new_delta[0], start[1]+new_delta[1]]
    if (validDirection) {
      while ((new_start[0] != end[0]) || (new_start[1] != end[1])) {
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
    for (let i = 0; i < BISHOP_DIRECTIONS.length; i++) {
      if (new_delta[0] == BISHOP_DIRECTIONS[i][0] && new_delta[1] == BISHOP_DIRECTIONS[i][1]) {
        validDirection = true
      }
    }
    let new_start = [start[0]+new_delta[0], start[1]+new_delta[1]]
    if (validDirection) {
      while ((new_start[0] != end[0] )|| (new_start[1] != end[1])) {
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
    for (let i = 0; i < QUEEN_DIRECTIONS.length; i++) {
      if (new_delta[0] == QUEEN_DIRECTIONS[i][0] && new_delta[1] == QUEEN_DIRECTIONS[i][1]) {
        validDirection = true
      }
    }
    let new_start = [start[0]+new_delta[0], start[1]+new_delta[1]]
    if (validDirection) {
      while ((new_start[0] != end[0]) || (new_start[1] != end[1])) {
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

  const makeRandomBlackMoves = (newBoardState) => {
    let locations = listBlackPieceLocations(newBoardState)
    randomOrderLocations = shuffleArray(locations)
    for (let i = 0; i < locations.length; i++) {
      let moves = findPossibleMoves(locations[0], newBoardState)
      if (moves.length != 0) {
        const randomIndex = Math.floor(Math.random() * moves.length);
        const randomMove = array[randomIndex];
        playMoves(locations[0], randomMove)
        return newBoardState;
      }
    }
    return newBoardState;
  }

  const playMoves = (startPos, endPos, newBoardState) => {
    if (currBoardState[endPos[0]][endPos[1]] === null ) {
      newBoardState[startPos[0]][startPos[1]] = null
      newBoardState[endPos[0]][endPos[1]] = [...piece]
    }
    else {
      if (currBoardState[endPos[0]][endPos[1]] !== null ) { //there is a piece there
        let piece = [...currBoardState[startPos[0]][startPos[1]]]
        let finalPiece = [...currBoardState[endPos[0]][endPos[1]]]
        if (finalPiece[0][0] !== piece[0][0]) {
          if (piece[1] >= finalPiece[2]) {
            newBoardState[startPos[0]][startPos[1]] = null
            piece[2] = piece[2] + parseInt(finalPiece[2]/2)
            newBoardState[endPos[0]][endPos[1]] = [...piece]
            if (piece == 'bk') {
              setBlackKing([endPos[0], endPos[1]])
            }
            if (piece == 'wk') {
              setWhiteKing([endPos[0], endPos[1]])
            }          
          } else {
            finalPiece[2] = finalPiece[2] - piece[1]
            newBoardState[endPos[0]][endPos[1]] = [...finalPiece]
          }
        }
      }
    }
    return newBoardState
  }

  function shuffleArray(array) {
    // Make a copy of the original array
    const shuffledArray = array.slice();
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
  }

  const findPossibleMoves = (start, newBoardState) => {
    let piece = newBoardState[start[0]][start[1]] // locations from method above
    let pieceType = piece[0][1]
    let moves = []
    switch (pieceType) {
      case 'r': moves = findPossibleRookMoves(start, newBoardState); break;
      case 'n': moves = findPossibleKnightMoves(start, newBoardState); break;
      case 'b': moves = findPossibleBishopMoves(start, newBoardState); break;
      case 'q': moves = findPossibleQueenMoves(start, newBoardState); break;
      case 'k': moves = findPossibleKingMoves(start, newBoardState); break;
      case 'p': moves = findPossibleBlackPawnMoves(start, newBoardState); break; //may have to redo for black pieces
    }
  }

  const findPossibleBlackPawnMoves = (start, newBoardState) => {
    let moves = []
    let row = start[0]
    let col = start[1]

    if (row == 1 && newBoardState[row+1][col] === null && newBoardState[row+2][col] === null) {
      moves.concat([row+1, col])
      moves.concat([row+2, col])
    }
    else if (row < 7 && newBoardState[row+1][col] === null) {
      moves.concat([row+1, col])
    }
    else {
      if (row < 7 && col > 0 && newBoardState[row+1][col-1] === null && newBoardState[row+1][col-1][0][0] === 'w') {
        moves.concat([row+1, col-1])
      }
      else if (row < 7 && col < 7 && newBoardState[row+1][col+1] === null && newBoardState[row+1][col-1][0][0] === 'w') {
        moves.concat([row+1, col+1])
      }
    }
    return moves
  }

  const findPossibleRookMoves = (start, newBoardState) => {
    let moves = []
    let row = start[0]
    let col = start[1]

    for (let i = 0; i < ROOK_DIRECTIONS.length; i++) {
      row = row + ROOK_DIRECTIONS[i][0]
      col = col + ROOK_DIRECTIONS[i][1]
      while ( row >= 0) {
        if (currBoardState[row][col] === null) {
          moves.concat([row, col])
        }
        else if (currBoardState[row][col][0][0] == 'w') {
          moves.concat([row, col])
          break;
        }
        else {
          break;
        }
        row = row + ROOK_DIRECTIONS[i][0]
        col = col + ROOK_DIRECTIONS[i][1]
      }
      row = start[0]
      col = start[1]
    }    
  }

  const findPossibleKnightMoves = (start, newBoardState) => {
    let moves = []
    let row = start[0]
    let col = start[1]
    for (let i = 0; i < KNIGHT_DIRECTIONS; i++) {
      let newLoc = [row + KNIGHT_DIRECTIONS[i][0], col + KNIGHT_DIRECTIONS[i][1]]
      if (validLocation(newLoc)) {
        if (newBoardState[newLoc[0]][newLoc[1]] === null || newBoardState[newLoc[0]][newLoc[1]][0][0] === 'w') {
          moves.concat(newLoc)
        }
      }
    }
    return moves
  }

  const findPossibleBishopMoves = (start, newBoardState) => {
    let moves = []
    let row = start[0]
    let col = start[1]

    for (let i = 0; i < BISHOP_DIRECTIONS.length; i++) {
      row = row + BISHOP_DIRECTIONS[i][0]
      col = col + BISHOP_DIRECTIONS[i][1]
      while ( row >= 0) {
        if (currBoardState[row][col] === null) {
          moves.concat([row, col])
        }
        else if (currBoardState[row][col][0][0] == 'w') {
          moves.concat([row, col])
          break;
        }
        else {
          break;
        }
        row = row + BISHOP_DIRECTIONS[i][0]
        col = col + BISHOP_DIRECTIONS[i][1]
      }
      row = start[0]
      col = start[1]
    }
  }

  const findPossibleQueenMoves = (start, newBoardState) => {
    let moves = []
    let row = start[0]
    let col = start[1]

    for (let i = 0; i < QUEEN_DIRECTIONS.length; i++) {
      row = row + QUEEN_DIRECTIONS[i][0]
      col = col + QUEEN_DIRECTIONS[i][1]
      while ( row >= 0) {
        if (currBoardState[row][col] === null) {
          moves.concat([row, col])
        }
        else if (currBoardState[row][col][0][0] == 'w') {
          moves.concat([row, col])
          break;
        }
        else {
          break;
        }
        row = row + QUEEN_DIRECTIONS[i][0]
        col = col + QUEEN_DIRECTIONS[i][1]
      }
      row = start[0]
      col = start[1]
    }
  }

  const findPossibleKingMoves = (start, newBoardState) => {
    let moves = []
    let row = start[0]
    let col = start[1]
    for (let i = 0; i < KING_DIRECTIONS; i++) {
      let newLoc = [row + KING_DIRECTIONS[i][0], col + KING_DIRECTIONS[i][1]]
      if (validLocation(newLoc)) {
        if (newBoardState[newLoc[0]][newLoc[1]] === null || newBoardState[newLoc[0]][newLoc[1]][0][0] === 'w') {
          moves.concat(newLoc)
        }
      }
    }
    return moves
  }

  const validLocation = (location) => {
    let row = location[0]
    let col = location[1]
    if (row >= 0 && row <= 7 && col >= 0 && col <= 0) {
      return true
    }
    return false
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