import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ChevronRight, User, Users, Wallet } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PatientCardsForm } from './components/patient-cards-form'
import { Button } from '@/components/ui/button'
import { useRouter } from "@tanstack/react-router";

const cardTypes = [
  {
    id: 'individual',
    title: 'Individual',
    description: 'Single person health card',
    icon: User,
    color: 'bg-primary/10 text-primary',
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Coverage for entire family',
    icon: Users,
    color: 'bg-primary/10 text-primary',
  },
]

type CardType = 'individual' | 'family' 

export function CreatePatientCard() {
  const { history } = useRouter();
  const [selectedCardType, setSelectedCardType] = useState<CardType | null>(
    null
  )

  const handleCardTypeSelect = (type: CardType) => {
    setSelectedCardType(type)
  }

  const handleChangeCardType = () => {
    setSelectedCardType(null)
  }

  return (
    <>
      <Header fixed>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create Patient Card</h1>
            <p className="text-muted-foreground">Create new patient card here.</p>
          </div>
        </div>
        <div className='w-full space-y-4'>
          <AnimatePresence mode='wait'>
            {!selectedCardType ? (
              <div className='mx-auto max-w-3xl lg:pt-10'>
                <div className='space-y-8'>
                  <div className='flex gap-3'>
                    <div className='flex size-8 items-center justify-center rounded-full bg-primary'>
                      <Wallet className='size-4 text-primary-foreground' />
                    </div>
                    <h1 className='text-2xl font-bold'>Select Card Type</h1>
                  </div>
                  <motion.div
                    key='card-selection'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className='mt-4 grid grid-cols-2 gap-4'
                  >
                    {cardTypes.map((cardType) => (
                      <Card
                        key={cardType.id}
                        className='cursor-pointer border-2 p-6 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-lg'
                        onClick={() =>
                          handleCardTypeSelect(cardType.id as CardType)
                        }
                      >
                        <div className='flex flex-col items-center gap-4 text-center'>
                          <div className={`rounded-full p-4 ${cardType.color}`}>
                            <cardType.icon className='h-8 w-8' />
                          </div>
                          <div>
                            <h3 className='text-lg font-semibold'>
                              {cardType.title}
                            </h3>
                            <p className='mt-1 text-sm text-muted-foreground'>
                              {cardType.description}
                            </p>
                          </div>
                          <ChevronRight className='h-5 w-5 text-muted-foreground' />
                        </div>
                      </Card>
                    ))}
                  </motion.div>
                </div>
              </div>
            ) : (
              <PatientCardsForm 
                cardType={selectedCardType} 
                onChangeCardType={handleChangeCardType}
              />
            )}
          </AnimatePresence>
        </div>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Dashboard',
    href: '/',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Patient Cards',
    href: '/patient-cards',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Create',
    href: '/patient-cards/create',
    isActive: true,
    disabled: true,
  },
]
