global using EgyptianAPI.Models;
global using EgyptianAPI.Helpers;
global using EgyptianAPI.Services.AuthService;
global using Microsoft.EntityFrameworkCore;
global using EgyptianAPI.Data;
global using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("https://ancient-egyptian-helper.ru", "http://localhost:3000", "http://localhost:3001")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                      });
});
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1",
        new Microsoft.OpenApi.Models.OpenApiInfo
        {
            Title = "EgyptianAPI - V1",
            Version = "v1"
        }
     );

    var filePath = Path.Combine(System.AppContext.BaseDirectory, "EgyptianAPI.xml");
    c.IncludeXmlComments(filePath);
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"Bearer {token} \")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddDbContext<EgyptianDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddHttpContextAccessor();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EgyptianAPI V1"));
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
