import {
  LayoutDashboard,
  Network,
  Shield,
  Users,
  UserCog,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'Main Menu',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Patient',
          url: '/patient-cards',
          icon: Users,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          title: 'Staff',
          url: '/staffs',
          icon: UserCog,
        },
        {
          title: 'Departments',
          url: '/departments',
          icon: Network,
        },
        {
          title: 'Roles',
          url: '/roles',
          icon: Shield,
        },
      ],
    },
  ],
}
