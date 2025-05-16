import { View } from "react-native"
import { SpecialText } from "./specialText"
import { useTheme } from "@ui-kitten/components"

const OutlinedText = ({text,FontSize=20}) => {
    const theme = useTheme()
    return (
        <View style={{ justifyContent:'center',alignContent:'center'}}>
            <SpecialText FontSize={FontSize-2} extStyle={{position:'absolute'}} text={text}/>
            <SpecialText FontSize={FontSize} extStyle={{position:'absolute'}} text={text}/>
        </View>
    )
}
export default OutlinedText