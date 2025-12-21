// Tipos TypeScript compartilhados

export interface User {
  id: string
  email: string
  name: string
}

export interface PomodoroSession {
  id: string
  userId: string
  startedAt: Date
  endedAt: Date | null
  duration: number
  status: 'completed' | 'abandoned'
  abandonmentReason: string | null
}

export interface Reflection {
  id: string
  pomodoroSessionId: string
  userId: string
  topic: string
  whatIThought: string
  whatItActuallyIs: string
  summary: string
  mandatoryQuestion: string
  optionalQuestion: string | null
  createdAt: Date
  updatedAt: Date
}


