export function formatEventType(type: string): string {
  const map: Record<string, string> = {
    DISEASE_ALERT: '질환 의심',
    BEHAVIOR_ANOMALY: '행동 이상',
  }
  return map[type] ?? type
}

export function formatSeverity(sev: string): string {
  const map: Record<string, string> = {
    HIGH: '높음',
    MEDIUM: '보통',
    LOW: '낮음',
  }
  return map[sev] ?? sev
}
