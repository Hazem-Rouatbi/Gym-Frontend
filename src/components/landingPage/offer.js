import { Image, StyleSheet, View, useWindowDimensions } from "react-native"
import { SpecialText } from "../specialText"
import { Card } from "@ui-kitten/components"
import { router } from "expo-router"
import { useTranslation } from "react-i18next"

const Offer = ({ id, nameEn = '', nameFr = "", benefits = [], srcImage = '', navigate = false, handleOfferSelect }) => {
    const imageSource = srcImage ? { uri: srcImage } : require('../../../assets/gymIcon.svg')
    const {width} = useWindowDimensions()
    const imgWidth = width*0.8
    const benefitsList = benefits.map((benefit, index) => {
        return (
            <SpecialText key={index} FontSize={20} text={'+ ' + benefit} />
        )
    })
    const { i18n } = useTranslation()
    const handleClick = () => {
        if (navigate) {
            router.navigate('/user/signup?id=' + id)
        }
        else {
            handleOfferSelect(id)
        }
    }
    return (
        <Card onPress={handleClick} style={styles.container}>
            <SpecialText FontSize={40} text={i18n.language === 'fr' ? nameFr : nameEn} />
            <Image source={imageSource} style={{...styles.image,width:imgWidth}} />
            {benefitsList}
        </Card>
    )
}
export default Offer

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        width: '100%'
    },
    image: {
        height: 200,
        borderRadius: 20,
        marginHorizontal: 'auto'
    }
})