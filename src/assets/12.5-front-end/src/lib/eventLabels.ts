export function formatEventType(type: string): string {
  const map: Record<string, string> = {
    DISEASE_ALERT: '질병/이상 징후',
    BEHAVIOR_ANOMALY: '행동 이상',
    ZONE_INTRUSION: '위험구역 침입',
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
