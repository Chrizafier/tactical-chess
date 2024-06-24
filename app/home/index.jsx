import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.largeText}>Welcome to Tactical Chess!</Text>
      <Text style={[styles.smallText, styles.underline]}>
        How to play:
      </Text>
      <Text style={[styles.smallText]}>
        {'\n'}
        The app follows the normal rules of chess, except for the following modifications below. 
        {'\n'}{'\n'}
        1. Health and Attack Points: Each piece has a certain number of health points and attack points. 
        {'\n'}
        The larger the attack points, the more damage a piece can deal on the enemy. The larger the health points, the more damage a piece can take.
        {'\n'}
        Pawn: Attack (2 pts) Health (2 pts)
        {'\n'}
        Knight or Bishop: Attack (5 pts) Health (5 pts)
        {'\n'}
        Rook: Attack (7 pts) Health (7 pts)
        {'\n'}
        Queen: Attack (9 pts) Health (9 pts)
        {'\n'}
        King: Attack (9 pts) Health (11 pts)
        {'\n'}{'\n'}
        2. Attacks occur when you attempt to move a piece into a space occupied by one of your opponent’s pieces. The only exception to this is when one of your pieces is in position to check your opponent’s king.
        {'\n'}{'\n'}
        3. If you are trying to capture an opponent’s piece with fewer or the same number of health points than the piece you are using to attack, your piece will gain half of the points the opponent piece was originally worth, and the opponent piece will be captured.
        {'\n'}{'\n'}
        4. If you are trying to capture an opponent’s piece with a greater number of health points than the piece you are using to attack, your piece will not lose or gain any health points, while the opponent piece will lose the number of health points equivalent to the number of points your piece was originally worth.
        {'\n'}{'\n'}
        5. Castling is still allowed, and all pieces move in the same ways as in normal chess.
        {'\n'}{'\n'}
        6. Upon killing the opponent's king, the player wins and the game ends.
      </Text>
      <Text style={[styles.smallText, styles.underline]}>
        {'\n'}{'\n'}
        Leaderboard:
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2D2D', // Light black background color
    alignItems: 'center-flex',
    justifyContent: 'center-flex',
    padding: 16,
  },
  largeText: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff', // White font color for contrast
  },
  smallText: {
    fontSize: 20,
    textAlign: 'left',
    color: '#ffffff', // White font color for contrast
  },
  underline: {
    textDecorationLine: 'underline', // Underline style
  indentedText: {
    paddingLeft: 100, // Add left padding for indentation
  },
  },
});
