import { BottomNavigation, BottomNavigationTab, Button, ButtonGroup, Layout, useTheme } from "@ui-kitten/components"
import { router } from "expo-router";
import { StyleSheet, View } from "react-native"
import { BarChartIcon, HomeIcon, ProfileIcon, SettingsIcon, StarIcon } from "../icons";
import { useState } from 'react';
import useKeyboard from "@_helpers/hooks/keyboardHook";
const BottomBar = () => {
  const theme = useTheme()
  const routes = ['home', '/workout/calendar', '/user/profile', '/user/dashboard']
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isKeyboardVisible] = useKeyboard()  
  return(
    // <Layout style={styles.container}>

    //     <ButtonGroup appearance="outline" size='large' style={{backgroundColor:theme['background-basic-color-1'],...styles.btns, }}>
    //         <Button style={{ width: '25%' }} accessoryLeft={HomeIcon}></Button>
    //         <Button onPress={() => { router.navigate('workout/calendar') }} style={{ width: '25%' }} accessoryLeft={StarIcon}></Button>
    //         <Button style={{ width: '25%' }} onPress={() => { router.navigate('user/profile') }} accessoryLeft={ProfileIcon}></Button>
    //         <Button onPress={() => { router.navigate('settings') }} style={{ width: '25%' }} accessoryLeft={SettingsIcon}></Button>
    //     </ButtonGroup>

    // </Layout>
    !isKeyboardVisible &&<BottomNavigation
      style={{...styles.container,backgroundColor:theme['background-basic-color-1']}}
      selectedIndex={selectedIndex}
      onSelect={index => {setSelectedIndex(index);router.navigate(routes[index])}}
    >
      <BottomNavigationTab
        icon={HomeIcon}
      />
      <BottomNavigationTab
        icon={StarIcon}
      />
      <BottomNavigationTab
        icon={ProfileIcon}
      />
     <BottomNavigationTab
        icon={BarChartIcon}
      />
    </BottomNavigation>
    // <><View style={styles.container}>
    //   <Button accessoryRight={HomeIcon} style={{...styles.btn, borderRightWidth:1}} />
    //   <Button accessoryRight={StarIcon} style={{...styles.btn, borderRightWidth:1}} />
    //   <Button accessoryRight={ProfileIcon} style={{...styles.btn, borderRightWidth:1}} />
    //   <Button accessoryRight={SettingsIcon} style={{...styles.btn, }} />
    // </View>
    //</>
  )
}
export default BottomBar
const styles = StyleSheet.create(
  {
    container: {
      flexDirection:'row',      
      width: '100%',
      margin:0,
      padding:0,
    },
    btns: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'relative',
      borderWidth: 1,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20
    },
    btn:{
      width:'25%',
      borderRadius:0
    }
  }
)