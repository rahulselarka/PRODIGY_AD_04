import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const initialBoard = Array(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = useState<string[]>(initialBoard);
  const [player, setPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = () => {
const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      setWinner(board[a]);
      return;
    }
  }

  if (board.every(square => square !== null)) {
    setWinner('draw');
  }
};


  const handlePress = (index: number) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    setPlayer(player === 'X' ? 'O' : 'X');
    checkWinner();
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setPlayer('X');
    setWinner(null);
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tic Tac Toe</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Text style={styles.status}>
        {winner ? (winner === 'draw' ? 'It\'s a draw!' : `Player ${winner} wins!`) : `Next Player: ${player}`}
      </Text>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 20,
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 32,
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
