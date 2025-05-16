import { Text, View, Button } from 'react-native';
import { sendPushNotification } from '@helpers/services/notifServices';
import { useSelector } from 'react-redux';











export default function App() {
  const notification = useSelector(state => state.notification.notification)

  const expoPushToken = useSelector(state => state.notification.expoPushToken)

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
    >
      <Text>Your Expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title: {notification && notification?.title}{' '}
        </Text>
        <Text>Body: {notification && notification?.body}</Text>
        <Text>
          Data:{' '}
          {notification && JSON.stringify(notification?.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}
