import { Image, StyleSheet, useWindowDimensions } from "react-native"
import { SpecialText } from "../specialText"
import { Card, Text } from "@ui-kitten/components"
import { useTranslation } from "react-i18next"

const Expect = ({ titleFr = '',titleEn = '', descriptionFr = '', descriptionEn = '',srcImage=require('../../../assets/gymIcon.svg')}) => {
    const {i18n} = useTranslation()
    const {width} = useWindowDimensions()
    const title = i18n.language==='fr'?titleFr:titleEn
    const description = i18n.language==='fr'?descriptionFr:descriptionEn
    return (
        <Card style={styles.container} status='primary'>
            <Image source={srcImage} style={{...styles.image,width:width*0.8}}/>
            <SpecialText  FontSize={30} text={title}/>
            <SpecialText  text={description} FontSize={20}/>
        </Card>
    )
}
export default Expect

const styles = StyleSheet.create({
    container:{
        borderWidth:0,
        margin:10,
        padding:10,
        flex:1,
        flexWrap:'wrap',
        justifyContent:'center',
        alignContent:'center'
    },

    image:{
        borderRadius:20,
        height:200,
    }
})