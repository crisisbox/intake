import {flow} from 'lodash'

const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const requiredFields = [
    'signupName',
    'signupPhone',
    'signupEmail',
    'signupZip',
    'affiliation',

]

const validateRequiredFields = (values, requiredFields) => (errors) =>
    requiredFields.reduce((_errors, field) =>
        values[field]
            ? _errors
            : ({ ..._errors, [field]: 'Required' })
, errors)

const validateEmail = (values, field) => (errors) =>
    values[field] && validEmailRegex.test(values[field])
        ? errors
        : {...errors, [field]: 'Invalid Email address'}

export const validate = values => flow(
    validateRequiredFields(values, requiredFields),
    validateEmail(values, 'signupEmail')
)({})