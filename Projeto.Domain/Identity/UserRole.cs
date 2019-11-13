using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Projeto.Domain.Identity
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
        public List<UserRole> UserRoles { get; set; }
    }
}