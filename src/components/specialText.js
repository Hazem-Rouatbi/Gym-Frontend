import { Text } from "@ui-kitten/components"

export const SpecialText = ({ split = false, FontFamily = 'Comfortaa', FontWeight = '500',
    FontSize = 70, Opacity = 0.9, text, Category = 'h2',textColor, extStyle= {}  }) => {
    const textColorS = textColor ? {color: textColor} : null;
        if (split) {
        text = text.split(' ')
        multiText = text.map((text, index) => {
            return (
                <Text key={index} style={{
                    textAlign:'center',
                    fontFamily: FontFamily,
                    fontWeight: FontWeight,
                    fontSize: FontSize,
                    opacity: Opacity,
                    ...textColorS,
                    ...extStyle
                }}
                    category={Category}>
                    {text}
                </Text>
            )
        })
        return (<>
            {multiText}
        </>
        )
    }

    return (
        <Text style={{
            textAlign:'center',
            fontFamily: FontFamily,
            fontWeight: FontWeight,
            fontSize: FontSize,
            opacity: Opacity,
            ...textColorS,
            ...extStyle
        }}
            category={Category}>
            {text}
        </Text>
    )
}