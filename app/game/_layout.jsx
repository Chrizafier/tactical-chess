// // import { Link, Stack, useRouter } from "expo-router"
// import { useRouter } from "expo-router"
// // import { StatusBar } from "expo-status-bar"
// import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
// // import { Avatar } from 'react-native-paper'
// // import Page from "."
// import Board from "./Board"




// export default function AppLayout() {
//     const router = useRouter()
  
//     return (
//     // <View style={styles.container}>
//     //   <Avatar.Icon size={128} icon="chess-bishop" />
//     // </View>

//     <Board />

//     )
// }


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // backgroundColor: '#30f',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   })


import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Chessboard } from 'react-chessboard'
// old file import
import Board from '.'
// current file for chessboard UI
// There is some tightly coupled control widgets
// Namely `reset` and `undo` buttons
// ...
// May want to try to decouple them (perhaps later if we have time???)
import Game from './Game'
// 
// import Controls from '.'



export default function AppLayout() {
  return (
    <View style={{ flex : 1, flexDirection : 'row', alignContent : 'center', justifyContent : 'center' }}>
      <View style={{ flex : 1, backgroundColor: '#f00', }}>
      </View>
      <View style={{ flex : 3, backgroundColor: '#0f0', }}>
        <View style={{ flex : 1, backgroundColor: '#ff0' }}>
        </View>
        <View style={{ flex : 3, flexDirection : 'row', backgroundColor: '#0f0', }}>
          <View style={{ flex : 3 / 5, backgroundColor : '#fff', }}>
          {/* <Chessboard id='borris' /> */}
          <Game id='borris'/>
          </View>
        </View>
        <View style={{ flex : 1, backgroundColor: '#f0f', }}>
        </View>
      </View>
      <View style={{ flex : 1, backgroundColor: '#00f', }}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
