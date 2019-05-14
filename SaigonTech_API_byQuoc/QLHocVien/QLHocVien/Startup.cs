using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using QLHocVien.Models;
using QLHocVien.Utils;
using Microsoft.AspNetCore.Session;

namespace QLHocVien
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
          .AddEnvironmentVariables();
      Configuration = builder.Build();

    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      string connectionString = Configuration.GetConnectionString("DefaultConnection");
      services.AddDbContext<QLHocVienContext>(options => options.UseSqlServer(connectionString));

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateIssuerSigningKey = true,
          RequireExpirationTime = true,
          ValidateLifetime = true,
          ValidIssuer = "https://localhost:44336",
          ValidAudience = "https://localhost:44336",
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Helper.AppKey))
        };
      });

      //cors
      services.AddCors(options =>
      {
        options.AddPolicy("AllowAllHeader",
            builder =>
            {
              builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials();
            });
      });
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2).AddJsonOptions(options =>
      {
        options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
      });
      services.AddDistributedMemoryCache();
      services.AddSession();
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
      app.UseStaticFiles();
      app.UseHttpsRedirection();
      //cors
      app.UseCors("AllowAllHeader");
      //authentication
      app.UseAuthentication();
      app.UseSession();
      app.UseMvc();

    }
  }
}
