using AutoMapper;

using FinalProjectFileManager.Data;
using FinalProjectFileManager.Exception;
using FinalProjectFileManager.Services;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Swashbuckle.AspNetCore.Swagger;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using System.IO;

namespace FinalProjectServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration
        {
            get;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // Automapper
            services.AddAutoMapper();

            // Configure swagger doc generation
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "FileManager", Version = "v1"
                });
            });

            // Configure EF Core DbContext
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<FileManagerContext>(
                    options => options.UseNpgsql(Configuration.GetConnectionString("FileManagerDatabase")))
                .BuildServiceProvider();

            // Add dependencies to IoC container
            services.AddTransient<IFileService, FileService>();
            services.AddTransient<IValidationService, ValidationService>();
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            // Seeder used in Program.cs for development
            //services.AddScoped<Seeder>();
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
                app.UseHsts();
            }

            //app.UseHttpsRedirection();

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "FileManager v1");
                c.RoutePrefix = "api";
            });

            app.UseMvc();
            if (Directory.Exists("./StorageRoot"))
            {
                Directory.Delete("./StorageRoot", true);
            }
            Directory.CreateDirectory("./StorageRoot");

        }
    }
}
