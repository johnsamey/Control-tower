using GrocerApi.Repositories;
using GrocerApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add dependency injection
builder.Services.AddScoped<IHierarchyRepository, HierarchyRepository>();
builder.Services.AddScoped<IHierarchyService, HierarchyService>();
builder.Services.AddScoped<IInventoryUploadService, InventoryUploadService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("https://ecommerce.thegrocer.online", "http://ecommerce.thegrocer.online")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
