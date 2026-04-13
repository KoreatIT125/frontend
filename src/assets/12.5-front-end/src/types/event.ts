export type EventSeverity = 'HIGH' | 'MEDIUM' | 'LOW' | string

export interface EventRecord {
  eventId: number
  siteName: string
  eventType: string
  timestamp: string
  snapshotUrl: string
  severity: EventSeverity
}
