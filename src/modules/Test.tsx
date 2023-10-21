/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, type PropsWithChildren, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Image,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { authSlice } from '../redux/slices/auth/authSlice';
import { useLoginUserMutation } from '../redux/RTKApis/auth/authApi-RTK';
import { BASE_URL } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	postsApi,
	useAddNewPostMutation,
	useDeletePostMutation,
	useGetAllPostsQuery,
	useLazyGetAllPostsByClickQuery,
	useLazyGetAllPostsQuery,
	useUpdateSpecificPostMutation,
} from '../redux/RTKApis/posts/postsApi-RTK';
import { log } from '../utils/log';
import { showAnError } from '../utils/showAnError';

interface IError {
	status?: number,
	data?: {
		statusCode: number,
		message: string
	}
	error: string
}

function generateRandomText(length) {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomText = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomText += characters.charAt(randomIndex);
	}

	return randomText;
}

const Test = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};
	// const [loginUser, { data, isLoading, error }] = useLoginUserMutation();
	// useEffect(() => {
	// 	if (data) {
	// 		AsyncStorage.setItem('access_token', data.access_token)
	// 	}
	// 	if (data) {
	// 		AsyncStorage.setItem('refresh_token', data.refresh_token)
	// 	}
	// }, [data])
	// const setToken = () => {
	// 	loginUser({ password: 'qwerty', login: 'qwerty' })

	// }
	// const clear = () => {
	// 	AsyncStorage.removeItem('access_token')
	// }



	const [search, setSearch] = useState('IVAN')

	const [trigger, resp] = useLazyGetAllPostsByClickQuery();

	const { data = [], isLoading } = useGetAllPostsQuery({ search: search })

	console.log(data.length, 'data')

	const [updatePostApi, result] = useUpdateSpecificPostMutation();

	const [addNewPost, res] = useAddNewPostMutation();

	const [deletePost, rs] = useDeletePostMutation();

	const updatePost = async (id: string) => {
		const randomText = generateRandomText(10);
		const inpurts = { id: id, content: randomText };

		await updatePostApi(inpurts);


	};

	const fetchPosts = async () => {
		try {
			await trigger(null).unwrap()
		} catch (error) {
			showAnError(error)
		}

	}

	if (resp.isLoading || res.isLoading || rs.isLoading || isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size={'large'} color={'green'} />
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={backgroundStyle}>
				{/* <TouchableOpacity onPress={setToken} style={{ backgroundColor: 'red', padding: 20 }}>
					<Text>Set token</Text>
				</TouchableOpacity> */}
				{/* <TouchableOpacity onPress={clear} style={{ backgroundColor: 'red', padding: 20 }}>
					<Text>Set clear</Text>
				</TouchableOpacity> */}
				<TouchableOpacity
					onPress={() => setSearch(search == 'IVAN' ? 'XZ' : 'IVAN')}
					style={{ backgroundColor: 'red', padding: 20 }}>
					<Text>test updatePostApi posts</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => fetchPosts()}
					style={{ backgroundColor: 'red', padding: 20 }}>
					<Text>Fetch posts</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						addNewPost({
							author: 'IVAN',
							content: 'Hello',
							country: 'UKRAINE',
							title: 'BYE',
						})
					}
					style={{ backgroundColor: 'green', padding: 20 }}>
					<Text>Create a new post</Text>
				</TouchableOpacity>

				<ScrollView>
					<View>
						{data.map((el, i) => {
							return (
								<View key={el._id}>
									<View
										style={{
											backgroundColor: '#fff',
											padding: 20,
											margin: 10,
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}>
										<View>
											<Text>{el.author}</Text>
											<Text>{el.content}</Text>
											<Text>{el.country}</Text>
											<Text>
												{new Date(el.createdAt).getTime().toLocaleString()}
											</Text>
										</View>
										<Image
											source={{
												uri:
													el.image ??
													'https://images.assetsdelivery.com/compings_v2/belitas/belitas2204/belitas220400031.jpg',
											}}
											style={{ width: 100, height: 100, borderRadius: 20 }}
										/>
										<TouchableOpacity
											onPress={() => deletePost({ id: el._id })}
											style={{ height: 40, width: 40, backgroundColor: '#000' }}
										/>
									</View>
									<TouchableOpacity
										onPress={() => updatePost(el._id)}
										style={{
											backgroundColor: '#fff',
											justifyContent: 'center',
											alignItems: 'center',
											borderRadius: 6,
											margin: 10,
											padding: 10,
										}}>
										<Text>Change title</Text>
									</TouchableOpacity>
								</View>
							);
						})}
					</View>
				</ScrollView>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default Test;
