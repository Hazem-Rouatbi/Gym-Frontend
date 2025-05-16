import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Layout, Text } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SpecialText } from '@components/specialText'
export const CircleTimer = ({onComplete,'isPlaying': isPlaying = false, 'trailColor': trailColor = '#E9EBEE','width': width = 100, 'size': size = 200, 'reset': reset = 0, 'time': time = 7, 'colorList': colorList = ['#004777', '#F7B801', '#A30000', '#A30000'], 'colorTimes': colorTimes = [7, 5, 2, 0] }) => {
    const [remainingTime, setRemainingTime] = useState(0)

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                onComplete={()=>{onComplete()}}
                isPlaying={isPlaying}
                key={reset}
                duration={time}
                colors={colorList}
                colorsTime={colorTimes}
                initialRemainingTime={time}
                isSmoothColorTransition={true}
                strokeLinecap="butt "
                pathlengh={9}
                size={size}
                strokeWidth={width}
                trailColor={trailColor}
            >
                {({ remainingTime }) => {
                    useEffect(() => {
                        setRemainingTime(remainingTime);
                    }, [remainingTime]);
                }}
            </CountdownCircleTimer>
            {/* {remainingTime <= 0 ? <Text style={styles.infoText}>Take a Break</Text> : <Text style={styles.infoText}>{remainingTime}</Text>} */}
            <SpecialText FontSize={17} text={remainingTime}/>
        </View>
    );
}

export const makeColorsArrayWithLength = (color1, color2, length, color3 = '#009292') => {
    let arr = []
    for (let i = 0; i < (length / 2); i++) {
        if (i % 2 == 0) {
            arr.push(color2)
        }
        else {
            arr.push(color1)
        }
    }
    arr.push(color3)
    arr.push(color3)
    return arr
}
export const makeTimesArrayWithLength = (length) => {
    let arr = []
    for (let i = 0; i < length; i++) {
        if (i % 2 == 0 || length - i - 1 == 0 || length - i - 1 == 1)
            arr.push(length - i - 1)
    }
    return arr
}
const styles = StyleSheet.create({
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap:'wrap',
        margin:10,
        padding:0}
})