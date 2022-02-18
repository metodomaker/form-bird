import * as React from 'react'
import NextLink from 'next/link'
import { signOut } from 'next-auth/react'
import {
  Flex,
  Text,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

import { FiUser } from 'react-icons/fi'

export default React.memo(function Navbar() {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <Flex
      as="nav"
      flex="none"
      w="full"
      h="70px"
      px={{ base: 1, sm: 4, md: 12 }}
      align="center"
      justify="space-between"
    >
      <NextLink href="/dashboard" passHref>
        <Link>
          <Text fontWeight="bold">Form Bird</Text>
        </Link>
      </NextLink>

      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiUser />}
          aria-label="User Options"
          size="sm"
        />
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
})
