using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Projeto.Domain.Identity;
using Projeto.Domain.Identity;
using Projeto.Domain.Models;

namespace Projeto.Repository.Data
{
    public class SoftEventosContext : IdentityDbContext<User, Role, int,
                                                    IdentityUserClaim<int>, UserRole,  IdentityUserLogin<int>, 
                                                    IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public SoftEventosContext(DbContextOptions<SoftEventosContext> options) : base(options)
        {
            
        }
        public DbSet<Evento> Eventos {get; set;}
        public DbSet<Palestrante> Palestrantes {get; set;}
        public DbSet<PalestranteEvento> PalestranteEventos {get; set;}
        public DbSet<Lote> Lotes {get; set;}
        public DbSet<RedeSocial> RedesSociais {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

             modelBuilder.Entity<UserRole>(userRole => 
                {
                    userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                    userRole.HasOne(ur => ur.Role)
                            .WithMany(r => r.UserRoles)
                            .HasForeignKey(ur => ur.RoleId)
                            .IsRequired();

                    userRole.HasOne(ur => ur.User)
                            .WithMany(r => r.UserRoles)
                            .HasForeignKey(ur => ur.UserId)
                            .IsRequired();
                }
            );
            
            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(PE => new {PE.EventoId, PE.PalestranteId});
        }
    }
}