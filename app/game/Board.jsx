import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Chess } from 'chess.js'
// import { Chessboard2 } from 'chessboard2'
import { Chessboard } from 'react-chessboard'


console.info({
  ww_as_px : Dimensions.get('window').width,
  wh_as_px : Dimensions.get('window').height,
  sw_as_px : Dimensions.get('screen').width,
  sh_as_px : Dimensions.get('screen').height,
  cw_as_px : document.documentElement.clientWidth,
  ch_as_px : document.documentElement.clientHeight,
  iw_as_px : window.innerWidth,
  ih_as_px : window.innerHeight,
})

const wpx = () => Math.floor( Dimensions.get('window').width / 4 )
const hpx = () => Math.floor( Dimensions.get('window').height / 4 )
const dim = () => wpx >= hpx ? hpx : wpx
console.info(dim)

export default function Board() {
  return (
    <View style={styles.container} >
      <Chessboard id='borris' boardWidth={400} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxWidth : '70%',
    backgroundColor: '#3f0',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
