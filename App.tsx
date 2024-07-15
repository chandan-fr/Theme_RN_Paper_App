import React, { useState } from 'react';
import { FlatList, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Text, Dialog, Switch, MD3Colors, Menu } from 'react-native-paper';
import Share from 'react-native-share';

type Options_Props = {
  message: string;
  url: string;
  email: string;
  subject: string;
  recipient: string;
};

const defaultOptions: Options_Props = {
  message: "This is a default message.",
  url: "https://defaulturl.com",
  email: "default@example.com",
  subject: "Default Subject",
  recipient: "919876543210"
};

const createOptions = (customOptions: Partial<Options_Props>): Options_Props => {
  return { ...defaultOptions, ...customOptions };
};


const App = ({ isDarkMode }: { isDarkMode: boolean }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const hideDialog = () => setVisible(false);

  const getImageURL = (i: number): string => {
    if (Platform.OS === "ios") {
      return 'https://picsum.photos/700';
    }
    return `https://picsum.photos/70${i + 1}`;
  };

  const handleShare = async (): Promise<void> => {
    let options: Options_Props = createOptions({
      message: "This is test share with message text.",
    });

    try {
      const res: any = await Share.open(options);
      console.log("response : ", res);
    } catch (error: any) {
      console.log("error : ", error.message);
    }
  };

  return (
    <View style={styles.parent}>
      <StatusBar
        animated={true}
        backgroundColor={isDarkMode ? MD3Colors.primary0 : MD3Colors.primary100}
        barStyle={!isDarkMode ? "dark-content" : "light-content"}
        showHideTransition={"fade"}
      />

      {/* header */}
      <Appbar.Header>
        <Appbar.Action icon="menu" />
        <Appbar.Content title="Theme App" />
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        <Menu
          visible={isMenu}
          onDismiss={() => setIsMenu(false)}
          anchor={<Appbar.Action onPress={() => setIsMenu(true)} icon="dots-vertical" />}
        >
          <Menu.Item leadingIcon="content-cut" onPress={() => { }} title="Cut" />
          <Menu.Item leadingIcon="content-copy" onPress={() => { }} title="Copy" />
          <Menu.Item leadingIcon="content-paste" onPress={() => { }} title="Paste" disabled />
          <Menu.Item leadingIcon="share-variant" onPress={() => handleShare()} title="Share" />
        </Menu>
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
