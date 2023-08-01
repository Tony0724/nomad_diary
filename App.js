import Realm from 'realm';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import Navigator from './navigator';
import { DBContext } from './context';

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id : "int",
    emotion: "string",
    message: "string"
  },
  primaryKey: "_id"
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);
  const startLoading = async() => {
    const connnection = await Realm.open({
      path: 'nomadDiaryDB',
      schema: [FeelingSchema],
    });
    setRealm(connnection);
  }
  const onFinish = () => setReady(true);
  if(!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={(e) => console.error(e)} />
  }
  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  )
}
