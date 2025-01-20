"use client"

import { useState } from "react"

interface ValidationRules {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: string) => boolean
}

interface FieldRules {
    [key: string]: ValidationRules
}

interface ValidationErrors {
    [key: string]: string
}

export default function useFormValidation(rules: FieldRules) {
    const [errors, setErrors] = useState<ValidationErrors>({})

    const validate = (name: string, value: string): boolean => {
        const fieldRules = rules[name]
        if (!fieldRules) return true

        if (fieldRules.required && !value) {
            setErrors(prev => ({ ...prev, [name]: "This field is required" }))
            return false
        }

        if (fieldRules.minLength && value.length < fieldRules.minLength) {
            setErrors(prev => ({
                ...prev,
                [name]: `Must be at least ${fieldRules.minLength} characters`
            }))
            return false
        }

        if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
            setErrors(prev => ({
                ...prev,
                [name]: `Must be no more than ${fieldRules.maxLength} characters`
            }))
            return false
        }

        if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
            setErrors(prev => ({ ...prev, [name]: "Invalid format" }))
            return false
        }

        if (fieldRules.custom && !fieldRules.custom(value)) {
            setErrors(prev => ({ ...prev, [name]: "Invalid value" }))
            return false
        }

        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })
        return true
    }

    const clearError = (name: string) => {
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })
    }

    return {
        errors,
        validate,
        clearError,
    }
}

