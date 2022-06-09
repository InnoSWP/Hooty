using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.Hubs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSignalR();
builder.Services.AddControllers();

builder.Services.AddScoped<IDBRepository, DBRepository>();

// add service here
builder.Services.AddTransient<IPollService, PollService>();
builder.Services.AddTransient<ISessionService, SessionService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IVoteRecordService, VoteRecordService>();
builder.Services.AddTransient<IOptionService, OptionService>();
builder.Services.AddTransient<IPollCollectionService, PollCollectionService>();

builder.Services.AddAutoMapper(typeof(AppMappingProfile));


builder.Services.AddDbContext<ApplicationContext>(options =>
{
	options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
	name: "default",
	pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.MapHub<PollHub>("/pollVoting");
app.Run();
