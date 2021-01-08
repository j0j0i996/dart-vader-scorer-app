import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Platform} from 'react-native';
import colors from '../config/colors';
import PlayerScoreComponent from '../components/PlayerScoreComponent';
import { render } from 'react-dom';
import LiveDartsComponent from '../components/LiveDartsComponent';

export default function InGameScreen() {
    const [selectedID, setSelection] = useState(1);

    const playerList = [
        { id: '1', name: 'Jonathan', remaining: 421, scoreBoard: [{ k:'Sets', v: 1}, { k:'Legs', v: 0}], stats: [{k:'Last score', v: 180}, {k:'Darts thrown', v: 7}, {k:'Average', v: 104.38}] },
        { id: '2', name: 'Sophie', remaining: 501, scoreBoard: [{ k:'Sets', v: 1}, { k:'Legs', v: 1}], stats: [{k:'Last score', v: 180}, {k:'Darts thrown', v: 7}, {k:'Average', v: 104.38}] },
        { id: '3', name: 'Player 3', remaining: 501, scoreBoard: [{k:'Sets', v: 1}, {k:'Legs', v: 0}], stats: [{k:'Last score', v: 180}, {k:'Darts thrown', v: 7}, {k:'Average', v: 104.38}] },
        //{ id: '4', name: 'Player 4', remaining: 501, scoreBoard: [{k:'Sets', v: 1}, {k:'Legs', v: 0}], stats: [{k:'Last score', v: 180}, {k:'Darts thrown', v: 7}, {k:'Average', v: 104.38}] },
    ];

    const scoreObject = {
        first: {id: '1', throw: 1, score: 20, field: 'S20'},
        second: {id: '2', throw: 2, score: 60, field: 'T20'},
        third: {id: '3', throw: 3, score: false, field: false},
    }
   
    const renderPlayerItem = ({ item }) => (
        <View style={[styles.item, item.id%2==0 ? { } : { borderRightWidth: 2, } ]}>
            <PlayerScoreComponent name={item.name} playerID={item.id} remaining={item.remaining} scoreBoard={item.scoreBoard} stats={item.stats} isSelected={(selectedID == parseInt(item.id)) ? true : false}/>
        </View>
    );

    return (
    <View style={styles.container}>
        <View style={styles.list}>
        <FlatList
            numColumns={2}
            data={playerList}
            renderItem={renderPlayerItem}
            listKey={'1'}
        />
        </View>
        <LiveDartsComponent scoreObject={scoreObject}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.gray,
  },
  horizontal_box: {
    flexDirection: 'row',
    width: '100%'
  },
  item: {
    flex: 0.5,
    borderColor: colors.gray,
    borderBottomWidth: 2,
    },
  list: {
    flexDirection: 'row',
  }
});