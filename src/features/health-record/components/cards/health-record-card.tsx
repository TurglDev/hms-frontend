import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import type { HealthRecord } from '@/features/health-record/types/health-record.types'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { HealthRecordDetails } from '../../details'

const statusStyles: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/30',
  pending: 'bg-warning/10 text-warning border-warning/30',
  closed: 'bg-muted text-muted-foreground border-border',
}

function formatDate(iso: Date) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function relative(iso: Date) {
  const diff = (Date.now() - new Date(iso).getTime()) / 86400000
  if (diff < 1) return 'Today'
  if (diff < 2) return 'Yesterday'
  if (diff < 30) return `${Math.floor(diff)} days ago`
  return formatDate(iso)
}

type HealthRecordCardProps = {
  healthRecord: HealthRecord
  isLast: boolean
}

export function HealthRecordCard({
  healthRecord,
  isLast,
}: HealthRecordCardProps) {
  return (
    <>
      <article className='animate-fade-in relative flex gap-4'>
        <div className='relative flex flex-col items-center'>
          <div
            className={cn(
              'mt-6 h-3 w-3 rounded-full ring-4 ring-background',
              healthRecord.status === 'active'
                ? 'bg-primary'
                : healthRecord.status === 'pending'
                  ? 'bg-warning'
                  : 'bg-muted-foreground/40'
            )}
          />
          {!isLast && <div className='w-px flex-1 bg-border' />}
        </div>
        <div className='mb-6 flex-1 rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md'>
          <Card>
            <CardContent className='flex items-start justify-between gap-4'>
              <div className='min-w-0 flex-1 space-y-4'>
                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <span className='font-mono text-sm font-semibold text-foreground'>
                      {healthRecord.healthRecordNo}
                    </span>

                    <Badge
                      variant='outline'
                      className={cn(
                        'border',
                        statusStyles[healthRecord.status]
                      )}
                    >
                      {healthRecord.status}
                    </Badge>
                  </div>

                  <div className='mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground'>
                    <span title={formatDate(healthRecord.createdAt)}>
                      {relative(healthRecord.createdAt)}
                    </span>

                    <span aria-hidden>·</span>

                    <span>Joshua</span>

                    <span aria-hidden>·</span>

                    <span className='text-muted-foreground/80'>Doctor</span>
                  </div>
                </div>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className='gap-3' variant='outline'>
                    <ExternalLink className='h-4 w-4' />
                    View Full Record
                  </Button>
                </SheetTrigger>
                <HealthRecordDetails
                  healthRecordId={healthRecord.id}
                />
              </Sheet>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  )
}
