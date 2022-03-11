import React from 'react'
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

// import songs from '../model/data';
import MusicPlayerEx from './components/MusicPlayerEx';
import NiceFlexBro from './components/NiceFlexBro';


export default class App extends React.Component {

	render() {
		return (
      // <MusicPlayerEx/>
      <NiceFlexBro/>
		)
	}
}
