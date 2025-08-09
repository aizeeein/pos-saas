export type OrderItemDTO = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    product?: {
        id: string;
        name: string;
        image?: string | null;
    }
}

export type OrderDTO = {
    id: string;
    userId: string;
    total: number;
    createdAt: string;
    items: OrderItemDTO[];
}

async function fetchJSON<T>(url: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(url, init);
    if (!res.ok) {
        let message = "Request failed";
        try {
            const data = await res.json();
            message = data?.error || message
        } catch {

        } throw new Error(message)
    }
    return res.json() as Promise<T>
}

export async function fetchOrders(): Promise<OrderDTO[]> {
    const init: RequestInit = {
        method: "GET",
        credentials: "include",
        cache: "no-store",
    };

    if (typeof window === "undefined") {
        const {cookies} = await import("next/headers");
        init.headers = {cookie: (await cookies()).toString()}
    }

    return fetchJSON<OrderDTO[]>("/api/orders", init)
}

export async function fetchOrder(orderId: string): Promise<OrderDTO> {
    const init: RequestInit = {
        method: "GET",
        credentials: "include",
        cache: "no-store",
    }
    if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    init.headers = { cookie: (await cookies()).toString() };
  }
   return fetchJSON<OrderDTO>(`/api/orders/${orderId}`, init)
}

export const ordersKeys = {
    all: ["orders"] as const,
    detail: (id: string) => ["order", id] as const,
}