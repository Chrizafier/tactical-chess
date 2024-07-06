// import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
// import { Chessboard2 } from 'chessboard2'

import React, { useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

// currently working JS implementation of TS example from Storyboard docs ...
// functionally moves pieces as needed but game state is still relatively wonky ...
// will need a bit of work for further extensions
export default Game = () => {
  const [move, setMove] = useState(1)
  const [game, setGame] = useState(new Chess())
  const [currentTimeout, setCurrentTimeout] = useState(null)

  function safeGameMutate(modify) {

    // let moves = FFEN(game)
    // console.info(moves)
    console.info(`move ${move} : `, game)
    
    modify(game)
    console.info(`move ${move} : `, game)
    setGame(new Chess(game.fen()))
    console.info(`move ${move} : `, game)
    // setGame(new Chess(moves))
    setMove(move + 1)
  }

  function makeRandomMove() {
    const possibleMoves = game.moves()

    // exit if the game is over
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return

    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex])
    })
  }

  function onDrop(sourceSquare, targetSquare, piece) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1] ? piece[1].toLowerCase() : 'q',
      })
    } catch (err) {
      return false
    }


    setGame(new Chess(game.fen()))

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    const newTimeout = setTimeout(makeRandomMove, 200)
    setCurrentTimeout(newTimeout)
    return true
  }

  // function fetchAllFEN(game)
  // const FFEN = g => g.history().map(m => m.fen())

  const boardWrapper = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  }

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  }

  return (
    <div style={boardWrapper}>
      <Chessboard
        id='chester'
        data-example-variant='PlayVsRandom'
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        }}
      />
      <button
        style={buttonStyle}
        onClick={() => {
          safeGameMutate((game) => {
            game.reset()
          })
          clearTimeout(currentTimeout)
        }}
      >
        reset
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          safeGameMutate((game) => {
            game.undo()
          })
          clearTimeout(currentTimeout)
        }}
      >
        undo
      </button>
    </div>
  )
}


// import React, { useState } from 'react'
// import { Chessboard } from 'react-chessboard'
// import { Chess } from 'chess.js'

// export default function PlayRandomMoveEngine() {
//   const [game, setGame] = useState(new Chess())

//   function makeAMove(move) {
// // const gameCopy = structuredClone(game)
// // console.info('gameCopy', gameCopy)
// const result = game.move(move)
// // setGame(gameCopy)
// setGame(game)
// return result // null if the move was illegal, the move object if the move was legal
//   }

//   function makeRandomMove() {
//     const possibleMoves = game.moves()
//     if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
//       return // exit if the game is over
//     const randomIndex = Math.floor(Math.random() * possibleMoves.length)
//     makeAMove(possibleMoves[randomIndex])
//   }

//   function onDrop(sourceSquare, targetSquare) {
//     // const piece = game.get(sourceSquare).type
//     const move = makeAMove({
//       from: sourceSquare,
//       to: targetSquare,
//       // always promote to a queen for example simplicity
//       // promotion: piece ? piece : 'q',
//     })

//     // illegal move
//     if (move === null) return false
//     setTimeout(makeRandomMove, 200)makeRandomMove
//     return true
//   }

//   return <Chessboard id='chester' position={game.fen()} onPieceDrop={onDrop} />
// }

// import React, { useState, setState } from 'react'
// import { Chessboard } from 'react-chessboard'
// import { Chess, DEFAULT_POSITION as DEFAULT_FEN } from 'chess.js'


// transpiled documentation example from Storyboard docs
// still needs a lot of work to function ...
// 
// 
// export default Game = () => {
//   // DEFAULT_POSITION as FEN -> 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
//   const chess = new Chess()
//   const [game, setGame] = useState(chess)
//   const [moveFrom, setMoveFrom] = useState('')
//   const [moveTo, setMoveTo] = useState(null)
//   const [showPromotionDialog, setShowPromotionDialog] = useState(false)
//   const [rightClickedSquares, setRightClickedSquares] = useState({})
//   const [moveSquares, setMoveSquares] = useState({})
//   const [optionSquares, setOptionSquares] = useState({})


//   function safeGameMutate(game) {
//     // const copy = {...game}
//     setGame(game => {
//       // const update = { ...game }
//       // const update = game.state
//       // const result = update.move()
//       // modify(game)
//       // modify(update)
//       // return update
//       return game
//     })
//   }

//   function getMoveOptions(square) {
//     const moves = chess.moves({
//       square,
//       verbose: true
//     })
//     if (moves.length === 0) {
//       setOptionSquares({})
//       return false
//     }

//     const newSquares = {}
//     moves.map(move => {
//       newSquares[move.to] = {
//         background:
//           chess.get(move.to) &&
//           chess.get(move.to).color !== chess.get(square).color
//             ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
//             : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
//         borderRadius: '50%'
//       }
//       return move
//     })
//     newSquares[square] = {
//       background: 'rgba(255, 255, 0, 0.4)'
//     }
//     setOptionSquares(newSquares)
//     return true
//   }

//   function makeRandomMove() {
//     const possibilities = chess.moves()
//     if (chess.isGameOver() || chess.isDraw() || possibilities.length === 0)
//       return
//     const index = Math.floor(Math.random() * possibilities.length)
//     const chess_move = possibilities[index]
//     const next = chess.move(chess_move)
//     //     // const gameCopy = structuredClone(game)
//     // // console.info('gameCopy', gameCopy)
//     // const result = game.move(move)
//     // // setGame(gameCopy)
//     // setGame(game)
//     // return result // null if the move was illegal, the move object if the move was legal

//     safeGameMutate(next)
//   }

//   function onSquareClick(square) {
//     setRightClickedSquares({})

//     // from square
//     if (!moveFrom) {
//       const hasMoveOptions = getMoveOptions(square)
//       if (hasMoveOptions) setMoveFrom(square)
//       return
//     }

//     // to square
//     if (!moveTo) {
//       // check if valid move before showing dialog
//       const moves = chess.moves({
//         moveFrom,
//         verbose: true
//       })
//       const foundMove = moves.find(m => m.from === moveFrom && m.to === square)
//       // not a valid move
//       if (!foundMove) {
//         // check if clicked on new piece
//         const hasMoveOptions = getMoveOptions(square)
//         // if new piece, setMoveFrom, otherwise clear moveFrom
//         setMoveFrom(hasMoveOptions ? square : '')
//         return
//       }

//       // valid move
//       setMoveTo(square)

//       // if promotion move
//       if (
//         (foundMove.color === 'w' &&
//           foundMove.piece === 'p' &&
//           square[1] === '8') ||
//         (foundMove.color === 'b' &&
//           foundMove.piece === 'p' &&
//           square[1] === '1')
//       ) {
//         setShowPromotionDialog(true)
//         return
//       }

//       // is normal move
//       // const clone = { ...chess }
//       // const move = gameCopy.move({
//       const move = chess.move({
//         from: moveFrom,
//         to: square,
//         promotion: 'q'
//       })

//       // if invalid, setMoveFrom and getMoveOptions
//       if (move === null) {
//         const hasMoveOptions = getMoveOptions(square)
//         if (hasMoveOptions) setMoveFrom(square)
//         return
//       }

//       // setGame(gameCopy)
//       // setGame(chess)
//       setGame(chess)

//       setTimeout(makeRandomMove, 300)
//       setMoveFrom('')
//       setMoveTo(null)
//       setOptionSquares({})
//       return
//     }
//   }

//   function onPromotionPieceSelect(piece) {
//     // if no piece passed then user has cancelled dialog, don't make move and reset
//     if (piece) {
//       // const copy = { ...chess }
//       chess.move({
//         from: moveFrom,
//         to: moveTo,
//         promotion: piece[1].toLowerCase() ?? 'q'
//       })
//       setGame(chess)
//       setTimeout(makeRandomMove, 300)
//     }

//     setMoveFrom('')
//     setMoveTo(null)
//     setShowPromotionDialog(false)
//     setOptionSquares({})
//     return true
//   }

//   function onSquareRightClick(square) {
//     const colour = 'rgba(0, 0, 255, 0.4)'
//     setRightClickedSquares({
//       ...rightClickedSquares,
//       [square]:
//         rightClickedSquares[square] &&
//         rightClickedSquares[square].backgroundColor === colour
//           ? undefined
//           : { backgroundColor: colour }
//     })
//   }

//   const boardWrapper = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: '20px',
//   }

//   const buttonStyle = {
//     marginTop: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     cursor: 'pointer',
//   }

//   return (
//     <div style={boardWrapper}>
//       <Chessboard
//         id='chester'
//         data-example-variant='ClickToMove'
//         animationDuration={200}
//         arePiecesDraggable={false}
//         position={chess.fen()}
//         onSquareClick={onSquareClick}
//         onSquareRightClick={onSquareRightClick}
//         onPromotionPieceSelect={onPromotionPieceSelect}
//         customBoardStyle={{
//           borderRadius: '4px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
//         }}
//         customSquareStyles={{
//           ...moveSquares,
//           ...optionSquares,
//           ...rightClickedSquares
//         }}
//         promotionToSquare={moveTo}
//         showPromotionDialog={showPromotionDialog}
//       />
//       <button
//         style={buttonStyle}
//         onClick={() => {
//           safeGameMutate(game => {
//             game.reset()
//           })
//           setMoveSquares({})
//           setOptionSquares({})
//           setRightClickedSquares({})
//         }}
//       >
//         reset
//       </button>
//       <button
//         style={buttonStyle}
//         onClick={() => {
//           safeGameMutate(game => {
//             game.undo()
//           })
//           setMoveSquares({})
//           setOptionSquares({})
//           setRightClickedSquares({})
//         }}
//       >
//         undo
//       </button>
//     </div>
//   )
// }
