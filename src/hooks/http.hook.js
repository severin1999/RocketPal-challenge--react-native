import React, { useCallback, useState } from 'react'

export const useHttp = () => {
    const [loading ,setLoading] = useState(false)

    const request = useCallback(async username => {
        setLoading(true)

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`)

            if(!response.ok) throw Error

            const data = await response.json()

            setLoading(false)
            return data
        } catch (err) {
            setLoading(false)
            throw new Error(err)
        }
    }, [])

    return { request, loading }
}