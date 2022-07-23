import { ProjectType, Permission } from "../models/Project"

function userHasPermission(
    user: string,
    project: ProjectType,
    permission: Permission
) {
    const member = project.members.find((self) => self.id == user)
    if (!member) return false
    else if (member.id == project.owner) return true
    else {
        const role = project.roles.find((self) => self.id == member.role)

        if (!role) return false
        else if (role.permissions.includes(permission)) return true
        else if (role.permissions.includes("*")) return true
        else return false
    }
}

export { userHasPermission }
