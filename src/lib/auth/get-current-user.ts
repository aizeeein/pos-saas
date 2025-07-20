import { headers } from "next/headers";
import { auth } from "../auth";

export const getCurrentUser = async () => {
    const session = await auth.api.getSession({headers: await headers()})

    if (!session?.session?.userId) {
        return null;
    }
    return {
        id: session.session.userId,
    }
}