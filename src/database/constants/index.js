const SOLUTION_STATE = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}

const ALERT_STATE = {
  PENDING: 'pending',
  SOLVED: 'solved',
  CANCELED: 'canceled'
}

const ALERT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

const DOCUMENT_TYPE = {
  JPG: 'image/jpg',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  PDF: 'application/pdf'
}

const ROLES = {
  ADMIN: 'admin',
  OPERATOR: 'operativo',
  AUDITOR: 'auditor'
}

const REGULATIONS = {
  AML: 'AML',
  TAXES: 'Impuestos',
  SECURITY: 'Seguridad'
}

const SELECTION_TYPE = {
  SIMPLE: 'simple',
  MULTIPLE: 'multiple',
  POSITIVE: 'positive',
  NEGATIVE: 'negative'
}

module.exports = {
  SOLUTION_STATE,
  ALERT_STATE,
  ALERT_PRIORITY,
  DOCUMENT_TYPE,
  ROLES,
  REGULATIONS,
  SELECTION_TYPE
}