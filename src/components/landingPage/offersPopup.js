import { Button, Divider, Modal, useTheme } from "@ui-kitten/components"
import { useTranslation } from "react-i18next"
import { plusOutline } from "../icons"
import { useState } from "react"
import { Platform, ScrollView, StyleSheet, View } from "react-native"
import { getRGBAColor } from "../../_helpers/utils"
import { SpecialText } from "../specialText"
import { AvailableOffers } from "../../_helpers/constants"
import Offer from "./offer"

const OffersPopup = ({ offer = '', onOfferSelect }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [visible, setVisible] = useState(false);
    const handleOfferSelect = (id) => {
        console.log(id);
        onOfferSelect(id)
        setVisible(false)
    }
    const AvailableOffersList = AvailableOffers.map((offer) =>
    (
        <View key={offer.id} style={{ flex: 1 }}>
            <Offer id={offer.id} handleOfferSelect={handleOfferSelect} navigate={false}
                 title={offer.title} benefits={offer.benefits} />
            <Divider style={{ borderWidth:1 }} />
        </View>)
    )

    return (
        <>
            <Button
                style={{...styles.addBtn,borderWidth:0,width:'50%'}}
                appearance="outline"
                onPress={() => { setVisible(true) }}
                accessoryRight={plusOutline({
                    fillColor: theme['text-basic-color'],
                    width: 45, height: 45
                })}>
                <SpecialText FontSize={20}
                    textColor={theme['text-basic-color']}
                    text={offer ? offer : t('offers')} />
            </Button>
            <Modal
                propagateSwipe={true}
                backdropStyle={getRGBAColor(theme['background-basic-color-4'])}
                visible={visible}
                onBackdropPress={() => setVisible(false)}
                style={styles.container}

            >
                <ScrollView scrollsToTop style={{...styles.ScrollView}}>
                        {AvailableOffersList}
                </ScrollView>
            </Modal>
        </>
    )
}
export default OffersPopup

const styles = StyleSheet.create({
    addBtn: {
        borderRadius: 100
    },
    container: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginHorizontal: 0,
        marginBottom: 0,
        marginTop: Platform.OS === 'ios' ? 14 : 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        width: '80%',
        height: '100%'
    },
    ScrollView: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    layout: {
        justifyContent: 'space-between'
    }
}) 