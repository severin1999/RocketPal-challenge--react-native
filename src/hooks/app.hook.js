import { useCallback, useState } from "react";

export const useApp = () => {
    const [userData, setUserData] = useState(null)

    const fetchedData = useCallback(fData => {
        setUserData(fData)
    })

    return { fetchedData, userData }
}