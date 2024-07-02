import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Switch, Text, Divider } from 'react-native-paper'

const ToggleTitle = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false)
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap : 20,
        color: "#fb5b5a",
      }
  })
  return (
    <View style={{ flex : 1, flexDirection : 'column', justifyContent : 'center', marginBottom : 20, width : '100%' }}>
        <View style={styles.container}>
            <Text variant="titleLarge">{isSwitchOn ? 'Login' : 'Sign Up'}</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={{ alignSelf : 'end' }} />
        </View>
        <Divider />
    </View>
  )
}

export default ToggleTitle