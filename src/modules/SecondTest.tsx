import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GET_ALL_USERS, GET_USER_BY_ID } from '../api/query/user';

import { CREATE_USER, DELETE_USER_BY_ID } from '../api/mutations/user';

const SecondTest = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const res = useQuery(GET_USER_BY_ID, {
    variables: { id: 2 },
  });
  console.log(res.data, 'data');
  const [newUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER_BY_ID);

  const deleteUserById = async (id) => {
    try {
      await deleteUser({
        variables: {
          id: id,
        },
      });
      refetch();
    } catch (e) {}
  };

  const createUser = async () => {
    try {
      await newUser({
        variables: {
          input: {
            username: 'IOS',
            age: 2020,
          },
        },
      });
      refetch();
      // log('res', res);
    } catch (e) {}
  };
  // log('data', data);
  if (loading) {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (error) {
    <Text style={{}}>{error.name}</Text>;
  }

  return (
    <SafeAreaView>
      <View>
        {data?.getAllUsers &&
          data.getAllUsers.map((el, i) => (
            <View key={i}>
              <View style={{ backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 }}>
                <Text style={{}}>
                  {el.username} id {el.id} age {el.age}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteUserById(el.id)}
                style={{ backgroundColor: 'aqua', margin: 20, padding: 20, borderRadius: 10 }}
              >
                <Text>Delete user</Text>
              </TouchableOpacity>
            </View>
          ))}
        <TouchableOpacity
          onPress={createUser}
          style={{ backgroundColor: 'aqua', margin: 20, padding: 20, borderRadius: 10 }}
        >
          <Text>Add new user</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  loaderView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
export default SecondTest;
