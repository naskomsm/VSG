using Api;
using Infrastrucure;
using Application;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices()
    .AddApiServices(builder.Configuration);

var app = builder.Build();
Console.WriteLine(app.Environment.IsDevelopment());
app.UseHealthChecks("/health");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "VSG Api");
        c.RoutePrefix = "api";
    });
}

app.UseHttpsRedirection();
app.MapControllers();

await app.RunAsync();