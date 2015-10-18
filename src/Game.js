var React = require('react-native');
var GameBoard = require('./GameBoard');
var GameHelpers = require('./GameHelpers');
var Modal = require('./Modal');
var FontedText = require('./FontedText');

var {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  ScrollView,
  addons,
  TouchableOpacity
  } = React;

var BOARD_SIZE = 4;


var Game = React.createClass({
  getInitialState: function () {
    return {
      indexes: GameHelpers.getShuffledIndexes(BOARD_SIZE),
    };
  },

  onNewGame: function () {
    this.setState({
      indexes: GameHelpers.getShuffledIndexes(BOARD_SIZE),
    });
  },

  onMoved: function (moveFrom, moveTo) {
    var indexesMatrix = GameHelpers.getMatrixFromIndxes(this.state.indexes, BOARD_SIZE);
    indexesMatrix[moveTo.y][moveTo.x] = indexesMatrix[moveFrom.y][moveFrom.x];
    indexesMatrix[moveFrom.y][moveFrom.x] = null;
    this.setState({
      indexes: GameHelpers.getIndexesFromMatrix(indexesMatrix)
    })
  },

  render() {
    return (
      <View  style={styles.container}>

        <View style={styles.headerArea}>
          <FontedText style={styles.header}>The fifteen game</FontedText>
          <FontedText style={styles.header2}>Slide tiles to put them in order.</FontedText>
        </View>

        <View style={styles.mainArea}>
          <GameBoard
            boardSize={BOARD_SIZE}
            indexes={this.state.indexes}
            onMoved={this.onMoved}/>
        </View>

        <View style={styles.bottomArea}>
          <TouchableOpacity onPress={this.onNewGame}>
            <FontedText style={styles.help}>Start from scratch?</FontedText>
          </TouchableOpacity>
        </View>

        <Modal isOpen={GameHelpers.isWon(this.state.indexes, BOARD_SIZE)}>
          <View style={styles.wonDialog}>
            <FontedText style={styles.header}>Hooray!</FontedText>
            <FontedText style={styles.header2}>Once again?</FontedText>
            <TouchableOpacity onPress={this.onNewGame}>
              <View style={styles.buttonWrapper}>
                <FontedText style={styles.button}>Play again</FontedText>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  headerArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomArea: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 15,
  },
  header2: {
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'center',
  },
  help: {
    opacity: 0.7,
  },
  wonDialog: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  buttonWrapper: {
    backgroundColor: '#FF3366',
    height: 55,
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    fontSize: 15,
    textAlign: 'center',
    color: "#FFFFFF",
  },
});

module.exports = Game;