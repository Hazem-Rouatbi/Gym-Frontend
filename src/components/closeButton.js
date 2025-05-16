export const CloseButton = () => {
    return (
        <Button
            style={{
                marginTop: 20,
                borderRadius: 100,
                height: 50,
                width: 50,
                backgroundColor: theme["background-color-transparent"],
                borderColor: theme["text-basic-color"],
            }}
            activeOpacity={0.5}
            onPress={() => closeModal()}
            accessoryRight={CloseIcon({
                fill: theme["text-basic-color"],
            })}
        />
    );
};
