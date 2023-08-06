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
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
}

const DOCUMENT_TYPE = {
    JPG: 'jpg',
    PNG: 'png',
    PDF: 'pdf'
}

const ROLES = {
    ADMIN: 'admin',
    OPERATOR: 'operativo'
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