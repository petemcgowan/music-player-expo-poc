import React from 'react'
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

import songs from '../model/data';
import HourMinutePicker from './HourMinutePicker';


export default class NiceFlexBro extends React.Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true
	}



	render() {

		return (
			<SafeAreaView style={styles.container}>
				<Image
					style={styles.albumCover}
					source={{ uri: 'https://underdownloads.s3.amazonaws.com/ambient/artwork.jpg' }}
				/>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control} >
						<Ionicons name='play-skip-back' size={48} color='#444' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} >
							<Ionicons name='ios-play-circle' size={48} color='#444' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control}>
						<Ionicons name='play-skip-forward' size={48} color='#444' />
					</TouchableOpacity>
				</View>
				<Text>file info</Text>
        <View style={styles.container}>
          <HourMinutePicker/>
        </View>
			</SafeAreaView>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumCover: {
		width: 250,
		height: 250
	},
	trackInfo: {
		padding: 40,
		backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	}
})
