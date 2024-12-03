"use client";

import { UserRole } from "@/auth";
import { userCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = ({children, allowedRole}:RoleGateProps) => {
    const role = userCurrentRole();

    if(role != allowedRole){
        return <FormError message="You do not have permission to view this content" />
    }

    return (
        <>
            {children}
        </>
    )
}