import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  useAddNewPostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsByClickQuery,
  useUpdateSpecificPostMutation,
} from '../redux/RTKApis/posts/postsApi-RTK';
import { showAnError } from '../utils/showAnError';
import colors from '../utils/colors';

function generateRandomText(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomText = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
}

function Test() {
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

  const [search, setSearch] = useState('IVAN');

  const [trigger, resp] = useLazyGetAllPostsByClickQuery();

  const { data = [], isLoading } = useGetAllPostsQuery({ search });

  console.log(data.length, 'data');

  const [updatePostApi] = useUpdateSpecificPostMutation();

  const [addNewPost, res] = useAddNewPostMutation();

  const [deletePost, rs] = useDeletePostMutation();

  const updatePost = async (id: string): Promise<void> => {
    const randomText = generateRandomText(10);
    const inpurts = { id, content: randomText };

    const res = await updatePostApi(inpurts);

    console.log(res);
  };

  const fetchPosts = async () => {
    try {
      await trigger(null).unwrap();
    } catch (error) {
      showAnError(error);
    }
  };

  useEffect(() => {
    console.log('hello');
  }, []);

  if (resp.isLoading || res.isLoading || rs.isLoading || isLoading) {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        {/* <TouchableOpacity onPress={setToken} style={{ backgroundColor: 'red', padding: 20 }}>
              <Text>Set token</Text>
            </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={clear} style={{ backgroundColor: 'red', padding: 20 }}>
              <Text>Set clear</Text>
            </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setSearch(search === 'IVAN' ? 'XZ' : 'IVAN')}
          style={styles.addNewPostBtn}
        >
          <Text>test updatePostApi posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchPosts()} style={styles.addNewPostBtn}>
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
          style={styles.addNewPostBtn}
        >
          <Text>Create a new post</Text>
        </TouchableOpacity>

        <ScrollView>
          <View>
            {data.map((el) => {
              return (
                <View key={el._id}>
                  <View style={styles.cardPost}>
                    <View>
                      <Text>{el.author}</Text>
                      <Text>{el.content}</Text>
                      <Text>{el.country}</Text>
                      <Text>{new Date(el.createdAt).getTime().toLocaleString()}</Text>
                    </View>
                    <Image
                      source={{
                        uri:
                          el.image ??
                          'https://images.assetsdelivery.com/compings_v2/belitas/belitas2204/belitas220400031.jpg',
                      }}
                      style={styles.imagePost}
                    />
                    <TouchableOpacity
                      onPress={() => deletePost({ id: el._id })}
                      style={styles.dltPostBtn}
                    />
                  </View>
                  <TouchableOpacity onPress={() => updatePost(el._id)} style={styles.updPostBtn}>
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.MAIN_WHITE,
    flex: 1,
  },
  addNewPostBtn: {
    backgroundColor: colors.MAIN_WHITE,
    padding: 20,
  },
  loaderView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cardPost: {
    alignItems: 'center',
    backgroundColor: colors.MAIN_WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 20,
  },
  imagePost: {
    borderRadius: 20,
    height: 100,
    width: 100,
  },
  dltPostBtn: {
    backgroundColor: colors.MAIN_BLACK,
    height: 40,
    width: 40,
  },
  updPostBtn: {
    alignItems: 'center',
    backgroundColor: colors.MAIN_WHITE,
    borderRadius: 6,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
});

export default Test;
