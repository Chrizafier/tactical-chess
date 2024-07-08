import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ showBackButton }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
        {showBackButton && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        <Appbar.Content title='Tactical Chess'/>
        <Appbar.Action icon='home' onPress={() => navigation.navigate('home')} />
        <Appbar.Action icon='chess-bishop' onPress={() => navigation.navigate('game')} />
        <Appbar.Action icon='account-cog' onPress={() => navigation.navigate('user_settings')} />
        <Appbar.Action icon='magnify' onPress={() => navigation.navigate('profile_search')} />
        <Appbar.Action icon='bell' onPress={() => navigation.navigate('working_notifications')} />
        <Appbar.Action icon='login' onPress={handleSignOut} />
    </Appbar.Header>
  );
};

export default CustomHeader;