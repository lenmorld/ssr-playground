import React from 'react'
import { useSelector } from 'react-redux'

export default function Sample() {
    const text = useSelector((state) => state.message)

    return (
        <div>
            From Redux state:
            <h3>{text}</h3>
        </div>
    )
}