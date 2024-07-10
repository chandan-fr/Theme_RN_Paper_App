import React, { useState } from 'react';
import { FlatList, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Text, Dialog, Switch, MD3Colors } from 'react-native-paper';


const App = ({ isDarkMode }: { isDarkMode: boolean }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const hideDialog = () => setVisible(false);

  const getImageURL = (i: number): string => {
    if (Platform.OS === "ios") {
      return 'https://picsum.photos/700';
    }
    return `https://picsum.photos/70${i + 1}`;
  };

  return (
    <View style={styles.parent}>
      <StatusBar
        animated={true}
        backgroundColor={isDarkMode ? MD3Colors.primary0 : MD3Colors.neutral0}
        barStyle={!isDarkMode ? "dark-content" : "light-content"}
        showHideTransition={"fade"}
      />

      {/* header */}
      <Appbar.Header>
        <Appbar.Action icon="menu" />
        <Appbar.Content title="Theme App" />
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      {/* body */}
      <View style={styles.body}>
        <View style={{ marginHorizontal: 10, }}>
          <FlatList
            data={[1, 1, 1, 1, 1]}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <>
                {index === 0 && <View style={{ marginTop: 10 }} />}

                <Card style={{ marginBottom: 10 }}>
                  {/* cover Image */}
                  <Card.Cover source={{ uri: getImageURL(index) }} />

                  {/* card content */}
                  <Card.Content style={{ marginTop: 10 }}>
                    <Text variant="titleMedium">Why do we use it?</Text>
                    <Text variant="bodySmall" style={{ marginTop: 15, textAlign: "justify" }}>
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                      The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,
                      content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum
                      as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                      Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </Text>
                  </Card.Content>

                  {/* card actions */}
                  <Card.Actions>
                    <Button onPress={() => setVisible(true)} >Ok</Button>
                  </Card.Actions>
                </Card>
              </>
            )}
          />
        </View>

        {/* dialog box */}
        <Dialog visible={visible}>
          <Dialog.Title>Theme App</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">This is simple dialog box for testing purpose!</Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});

export default App;
