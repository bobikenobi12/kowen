import React from 'react'
import { Text, HStack, Switch, useColorMode } from 'native-base'

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <HStack space={2} alignItems="center">
      <Text fontSize="lg">Dark Mode</Text>
      <Switch
        isChecked={isDark}
        onToggle={toggleColorMode}
        accessibilityLabel="Toggle Color Mode"
      />
      <Text fontSize="lg">Light Mode</Text>
    </HStack>
  )
}
