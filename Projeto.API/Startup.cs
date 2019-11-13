using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Projeto.Domain.Identity;
using Projeto.Repository.Data;
using Projeto.Repository.Interfaces;
using Projeto.Repository.Repository;

namespace Projeto.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SoftEventosContext>(x => 
                    x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

           IdentityBuilder build = services.AddIdentityCore<User>(options => 
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false; 
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 4; 
                }
            );

            build = new IdentityBuilder(build.UserType, typeof(Role), build.Services);
            build.AddEntityFrameworkStores<SoftEventosContext>();
            build.AddRoleValidator<RoleValidator<Role>>();
            build.AddRoleManager<RoleManager<Role>>();
            build.AddSignInManager<SignInManager<User>>();

            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => 
            //     {
            //         options.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             ValidateIssuerSigningKey = true,
            //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
            //             ValidateIssuer = false,
            //             ValidateAudience = false,
            //         };
            //     }
            // );

            // services.AddMvc(options => {
            //         var policy = new AuthorizationPolicyBuilder()
            //             .RequireAuthenticatedUser()
            //             .Build();

            services.AddMvc();

            //             options.Filters.Add(new AuthorizeFilter(policy));
            //     })
            //     .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            //     .AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling 
            //                     = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddScoped<ISoftEventosRepository, SoftEventosRepository>();
            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());  


            // app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
 