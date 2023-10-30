'use client'

import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiChartPie, HiCog } from 'react-icons/hi'

const NavigationMenu = () => {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie} href="/">
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item icon={HiCog} href="/configuration">
            Konfiguracja
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default NavigationMenu
