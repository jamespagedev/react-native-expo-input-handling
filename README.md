# react-native-expo-input-handling

Prerequisites and Setup/Install used with Windows 10 OS.

# Prerequisites

- cygwin
- Nodejs
- Yarn
- Expo and expo-cli
- java jdk version 17 minimum
- android studio similator

# Setup and Install

## Hints

- If commands are failing after install or updating envirnment variables, open a new commandline.

## Cygwin

- download and install cygwin
- add `C:\cygwin64\bin` to system environment variables
- ensure you have access to cygwin commands in your commandline by running `ls`

## Node

- download the latest stable node installer and install it
- ensure you have access to node in your commandline by running `node --version`

## Yarn

- execute command: `npm install --global yarn`
- add `C:\Users\<user>\AppData\Local\Yarn\bin` to system environment variables

## Expo

```
yarn global add expo
yarn global add expo-cli
```

## Java

- Google "Java JDK"
- Go to oracle download section
- Select JDK 17 tab
- Select Windows tab
- download "x64 Installer"
- Run the installer and go through the wizard
- Add `C:\Program Files\Java\jdk-17\bin` to your environment variables

## Android studio similator

- ToDo: https://www.youtube.com/watch?v=0zx_eFyHRU0

# Run similator

```
cd C:\Users\%USERNAME%\AppData\Local\Android\Sdk\emulator
(-or-)
cd %userProfile%\AppData\Local\Android\Sdk\emulator
emulator -avd <device_name>
```

### Useful Android Similator Commands

- list of available devices - `emulator -list-avds`
- reset connection to device - `adb reconnect offline`
- handle port error - `adb kill-server` and `adb start-server`

# Run project

- open commandline in project directory
  - if this is the first time running the project, execute command `yarn`
- execute command `npx expo`
  - (optional) to run the app with cache cleared, enter `expo start -c` instead
- to load the app onto the running android similator, type `a`
  - (note: similator must be running for this to work)
- to load the app into your web browser, type `w`

# (Optional): Creating new projects with expo and react-native

## Create project with expo-router and typescript

```
npx create-expo-app <app name> --example with-router
cd <app name>
touch tsconfig.json
(change index.js to index.ts)
npx expo
```

- enter `y` to install all typescript dependancy packages
- (you should now see the app running in your commandline)
- ctrl+c to close the running project

## Create project with expo, react-navigation, and typescript

```
npx create-expo-app <app name> -t expo-template-blank-typescript
cd <app name>
yarn add axios @react-navigation/native @react-navigation/native-stack
npx expo install expo-router expo-constants expo-linking expo-splash-screen expo-status-bar
npx expo install expo-secure-store
npx expo install react-native-screens react-native-safe-area-context
```

## Use expo template to create an app

- execute command `expo init`
- use arrow keys to select one you want and hit enter
- give a name for your application
- execute command `cd <app-name>`
- execute command `yarn web`

## Other optional packages

- allows browser support for navigation links in the url

```
yarn add react-native-web react-dom @expo/webpack-config
yarn add @react-navigation/web
```

# (Optional): Helpful vs code user snippets

- javascriptreact.json

```
  "Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "export default function ${ComponentName}() {",
      "  return <div>${ComponentName}</div>;",
      "}",
      ""
    ]
  },
  "React Native Functional Component": {
    "prefix": "rnfc",
    "body": [
      "import React from 'react';",
      "import { Text, View } from 'react-native';",
      "import { globalStyles } from './styles';",
      "",
      "export default function ${ComponentName}() {",
      "  return (",
      "    <View style={globalStyles.container}>",
      "      <Text>${ComponentName}</Text>",
      "    </View>",
      "  );",
      "}",
      ""
    ]
  },
  "React Native Functional Component With Styles": {
    "prefix": "rnfcws",
    "body": [
      "import React from 'react';",
      "import { StyleSheet, Text, View } from 'react-native';",
      "",
      "export default function ${ComponentName}() {",
      "  return (",
      "    <View style={styles.container}>",
      "      <Text>${ComponentName}</Text>",
      "    </View>",
      "  );",
      "}",
      "",
      "const styles = StyleSheet.create({",
      "  container: {",
      "    flex: 1,",
      "    justifyContent: 'center',",
      "    alignItems: 'center'",
      "  }",
      "});",
      ""
    ]
  },
  "Console Log": {
    "prefix": "conl",
    "body": "console.log('${message}');"
  },
  "Console Log Variable": {
    "prefix": "conlv",
    "body": "console.log('${value}:', ${value});"
  }
```

- typescriptreact.json

```
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "// interface Props {}",
      "",
      "export default function ${ComponentName}(): JSX.Element {",
      "  return <div>${ComponentName}</div>;",
      "}",
      ""
    ]
  },
  "React Native Functional Component": {
    "prefix": "rnfc",
    "body": [
      "import React from 'react';",
      "import { Text, View } from 'react-native';",
      "import { globalStyles } from './styles';",
      "",
      "// interface Props {}",
      "",
      "export default function ${ComponentName}(): JSX.Element {",
      "  return (",
      "    <View style={globalStyles.container}>",
      "      <Text>${ComponentName}</Text>",
      "    </View>",
      "  );",
      "}",
      ""
    ]
  },
  "React Native Functional Component With Styles": {
    "prefix": "rnfcws",
    "body": [
      "import React from 'react';",
      "import { StyleSheet, Text, View } from 'react-native';",
      "",
      "// interface Props {}",
      "",
      "export default function ${ComponentName}(): JSX.Element {",
      "  return (",
      "    <View style={styles.container}>",
      "      <Text>${ComponentName}</Text>",
      "    </View>",
      "  );",
      "}",
      "",
      "const styles = StyleSheet.create({",
      "  container: {",
      "    flex: 1,",
      "    justifyContent: 'center',",
      "    alignItems: 'center'",
      "  }",
      "});",
      ""
    ]
  },
  "Console Log": {
    "prefix": "conl",
    "body": "console.log('$1');"
  },
  "Console Log Variable": {
    "prefix": "conlv",
    "body": "console.log('${value}:', ${value});"
  }
```

# Triaging

## Error: `babel-plugin-module-resolver@5.0.0: The engine "node" is incompatible with this module...`

### Issue

You may see this if you run `yarn`.
Seems like a known issue: https://github.com/getredash/redash/issues/5881

### Fix

To get around this, run `yarn --ignore-engines`.

# Acknowledgements
