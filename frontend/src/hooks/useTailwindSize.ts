import { useState } from "react"

const sizes = [4, 8, 10, 12, 14, 20]
const len = sizes.length

export function useTailwindSize() {
    const [index, setIndex] = useState(sizes.indexOf(10))

    const increase = () => {
        setIndex((index + 1) % len)
    }

    const decrease = () => {
        const newindex = (len + index - 1) % len
        setIndex(newindex)
    }

    const size = "size-" + sizes[index]

    return { size, increase, decrease }
}