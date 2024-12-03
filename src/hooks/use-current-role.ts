import { useSession } from "next-auth/react";
import { UserRole } from "@/auth";

export const useCurrentRole = () => {
    const { data: session } = useSession();

    return session?.user?.role as UserRole | undefined;
}

