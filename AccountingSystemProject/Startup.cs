using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AccountingSystemProject
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
          services.AddCors(options =>
          {
            options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
          });

            services.AddMvc();

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
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });


        }
    }

  public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
  {
    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
      filterContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:4200");
      filterContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
      filterContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE");
      filterContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers,X-Requested-With,content-type,Access-Control-Allow-Origin,email,password,Access-Control-Allow-Credentials," +
        "Access-Control-Allow-Methods"
      );


      base.OnActionExecuting(filterContext);
    }
  }
}
