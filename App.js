import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { NativeBaseProvider, Button, Box } from 'native-base';
import * as SMS from 'expo-sms';

export default function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      const { data } = await Contacts.getContactsAsync();
      // console.log(data);
      setContacts(data);
    };
    getContacts();
  }, []);

  const call = (contact) => {

    let phoneNumber = contact.phoneNumbers[0].number;
    console.log(phoneNumber);

    const link = `tel:${phoneNumber}`;
    Linking.canOpenURL(link)
      .then(supported => Linking.openURL(link))
      .catch(err => console.error(err));
  }

  
  const renderItem = ({ item }) => (
    <Button borderRadius='full' size='lg' colorScheme='dark' variant='outline' onPress={() => call(item)} mb="2.5" >{item.name}</Button>
  )
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.title}>
            <Text>Call</Text>

            <Text>Contacts</Text>
          </View>
          <View>
            <FlatList
              data={contacts}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </View>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: '#A0AEB4',
    marginTop: 100,
    marginBottom: 25,
    alignItems: 'center',
  },
});

