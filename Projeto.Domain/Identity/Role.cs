using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Projeto.Domain.Identity;

namespace Projeto.Domain.Identity
{
    public class Role : IdentityRole<int>
    {
        public List<UserRole> UserRoles { get; set; }
    }
}