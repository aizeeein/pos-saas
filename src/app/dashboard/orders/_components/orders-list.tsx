'use client'

import { useQuery } from "@tanstack/react-query"

export default function OrdersList() {
    const {data: orders=[], isLoading} = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
    })

    if (isLoading) return <div>Loading...</div>
    if (orders.length === 0) return <p>Belum ada history pesanan</p>

    return (
        <div>
            
        </div>
    )
}