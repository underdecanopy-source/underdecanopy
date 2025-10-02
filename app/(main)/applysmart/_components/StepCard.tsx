"use client"

import { useState } from "react"

export default function StepCard({ number, name, description }: { number: string, name: string, description: string }) {
    const trimed = description.length > 90 ? description.slice(0, 90) + "..." : description
    const [trimedDescription, setTrimedDescription] = useState(trimed)

    return (
        <div className="step">
            <div className="num" aria-hidden="true">{number}</div>
            <h3>{name}</h3>
            <p>{trimedDescription}</p>

            {trimedDescription.length === 90 + 3 && (
                <div
                    onClick={() => setTrimedDescription(description)}
                    className='mt-2 text-xs text-gray-800 font-bold cursor-pointer underline'>Read more</div>
            )}

            {trimedDescription.length > 90 + 3 && (
                <div
                    onClick={() => setTrimedDescription(trimed)}
                    className='mt-2 text-xs text-gray-800 font-bold cursor-pointer underline'>Show less</div>
            )}

        </div>
    )
}
