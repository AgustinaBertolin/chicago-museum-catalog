import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import { Image, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { RootStackParamList } from "src/types/navigation"


export const FullscreenImageScreen = ({navigation, route}: FullscreenScreenRouteProp) => {

  const { uri } = route.params

  const [show, setShow] = useState(true)

  const toggleHeader = () => {
    navigation.setOptions({
      headerShown: show,
    })
    setShow(!show)
  }

  return (
    <>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={toggleHeader}>
        <View style={styles.container}>
          <Image source={{uri}} style={styles.image} />
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'},
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    resizeMode: 'contain',
  },
})

type FullscreenScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'FullscreenImage'
>;
