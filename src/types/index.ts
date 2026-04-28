export type UserRole = 'CLIENT' | 'ADMIN'

export type ProjectStatus =
  | 'LEAD'
  | 'BRIEFING'
  | 'DEVELOPMENT'
  | 'REVIEW'
  | 'DELIVERED'
  | 'CANCELLED'

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'PAST_DUE'

export interface User {
  id: string
  name: string | null
  email: string
  role: UserRole
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description: string | null
  status: ProjectStatus
  clientId: string
  client?: User
  timerStartedAt: Date | null
  timerDeadline: Date | null
  demoUrl: string | null
  finalFiles: string[]
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface Ticket {
  id: string
  projectId: string
  project?: Project
  subject: string
  status: TicketStatus
  messages: TicketMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface TicketMessage {
  id: string
  ticketId: string
  authorId: string
  author?: User
  content: string
  isAdmin: boolean
  createdAt: Date
}

export interface Briefing {
  id: string
  projectId: string
  businessName: string
  businessDescription: string
  targetAudience: string | null
  desiredFeatures: string
  referenceUrls: string[]
  logoUrl: string | null
  brandColors: string[]
  deadline: string | null
  additionalNotes: string | null
  submittedAt: Date
}

export interface Payment {
  id: string
  projectId: string
  amount: number
  status: PaymentStatus
  stripePaymentId: string | null
  paidAt: Date | null
  createdAt: Date
}

export interface Subscription {
  id: string
  clientId: string
  projectId: string | null
  status: SubscriptionStatus
  stripeSubscriptionId: string | null
  currentPeriodEnd: Date | null
  price: number
  createdAt: Date
}

export interface PricingOption {
  id: string
  name: string
  basePrice: number
  description: string
  features: string[]
  deliveryHours: number
}

export interface KanbanColumn {
  id: ProjectStatus
  label: string
  projects: Project[]
}

export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  deliveredProjects: number
  totalRevenue: number
  activeSubscriptions: number
}
