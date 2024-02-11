enum Roles {
    Admin = 1,
    User = 2,
}

const RolePermissions = {
    [Roles.User]: [],
    [Roles.Admin]: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(RolePermissions);
const rolePermissionMap = new Map(Object.entries(RolePermissions));

export { roles, rolePermissionMap };
