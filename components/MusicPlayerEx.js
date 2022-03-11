import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

import songs from '../model/data';
import HourMinutePicker from './HourMinutePicker';

const audioBookPlaylist = [
	{
		title: 'Brown 900',
		author: 'LC MOD',
		source: 'source',
		// uri:
		// 	'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
		// uri: '../assets/songs/Brown_900Hz_LC_Noise_MOD.mp3',
		// uri: 'https://underdownloads.s3.amazonaws.com/ambient/Brown_900Hz_LC_Noise_MOD.mp3',
		uri: 'https://underdownloads.s3.amazonaws.com/ambient/SNIP_Brown_900Hz_LC_Noise_MOD.aif',
		imageSource: 'https://underdownloads.s3.amazonaws.com/ambient/artwork.jpg'
    // uri:  'https://p.scdn.co/mp3-preview/ef83054a53d976a0e5e947b39cff362a2db7c631?cid=1d62fc4c9282424c8d5611d95669ba0d',
	},
	{
		title: 'PinkBrown',
		author: 'LC Noise Together',
		source: 'source',
		// uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
		// uri: '../assets/artwork/Brown_900Hz_LC_Noise_MOD.mp3',
		// uri: 'https://s3.console.aws.amazon.com/s3/object/underdownloads?region=us-east-1&prefix=ambient/Pink_Brown_900Hz_LC_Noise_Together.mp3',
		uri: 'https://underdownloads.s3.amazonaws.com/ambient/SNIP_Pink_Brown_900Hz_LC_Noise_Together.aif',
		imageSource: 'https://underdownloads.s3.amazonaws.com/ambient/artwork2.jpg'
	},
	{
		title: 'Brown 900',
		artist: 'LC Noise',
		source: 'source',
		// uri:
		// 	'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
		// uri: '../assets/songs/Brown_900Hz_LC_Noise.mp3',
		uri: 'https://underdownloads.s3.amazonaws.com/ambient/SNIP_Brown_900Hz_LC_Noise.aif',
		imageSource:  'https://underdownloads.s3.amazonaws.com/ambient/artwork3.jpg',
	},
	{
		title: 'Brown 900',
		artist: 'v3 Tighter Slopes',
		source: 'source',
		// uri: '../assets/songs/Noise_Brown_v3_131_600_tighter_slopes.mp3',
		uri: 'https://underdownloads.s3.amazonaws.com/ambient/SNIP_Noise_Brown_v3_131_600_tighter_slopes.aif',
		imageSource: 'https://underdownloads.s3.amazonaws.com/ambient/artwork2.jpg'
	}
]

export default class MusicPlayerEx extends React.Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true
	}

	async componentDidMount() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})

			this.loadAudio()
		} catch (e) {
			console.log(e)
		}
	}

	async loadAudio() {
		const { currentIndex, isPlaying, volume } = this.state

		try {
			const playbackInstance = new Audio.Sound()
			const source = {
				// uri: audioBookPlaylist[currentIndex].uri
				uri: audioBookPlaylist[currentIndex].uri
			}

      // console.log("source:" + JSON.stringify(source) + ", currentIndex:" + currentIndex + ", audioBookPlaylist[currentIndex].uri:" + audioBookPlaylist[currentIndex].uri );
			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);

			// await playbackInstance.loadAsync(require('../assets/songs/Brown_900Hz_LC_Noise_MOD.mp3'), status, false);
			// await playbackInstance.loadAsync(require(source), status, false);
			// await playbackInstance.loadAsync(require(audioBookPlaylist[currentIndex].uri), status, false);
			// await playbackInstance.loadAsync(require(source), status, false);
			await playbackInstance.loadAsync(source, status, false);
			this.setState({
				playbackInstance
			});
		} catch (e) {
			console.log(e)
		}
	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}

	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	handlePreviousTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < audioBookPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
			this.setState({
				currentIndex
			})
			this.loadAudio()
		}
	}

	handleNextTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
			this.setState({
				currentIndex
			})
			this.loadAudio()
		}
	}

	renderFileInfo() {
		const { playbackInstance, currentIndex } = this.state
		return playbackInstance ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{audioBookPlaylist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].author}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].source}
				</Text>
			</View>
		) : null
	}

	render() {
    const { currentIndex} = this.state

		return (
			<View style={styles.container}>
				<Image
					style={styles.albumCover}
					source={{ uri: audioBookPlaylist[currentIndex].imageSource }}
				/>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
						<Ionicons name='play-skip-back' size={48} color='#444' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
						{this.state.isPlaying ? (
							<Ionicons name='ios-pause' size={48} color='#444' />
						) : (
							<Ionicons name='ios-play-circle' size={48} color='#444' />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
						<Ionicons name='play-skip-forward' size={48} color='#444' />
					</TouchableOpacity>
				</View>
				{this.renderFileInfo()}
        <View style={styles.container}>
          <HourMinutePicker/>
        </View>
			</View>

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
