using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DataLayer.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", b =>
	{
		b.AllowAnyOrigin()
			.AllowAnyMethod()
			.AllowAnyHeader();
	})
);


/*builder.Services.AddCors(options =>
{
	options.AddPolicy("CorsPolicy",
		b => b.WithOrigins("*"));
});
*/
// Add services to the container.

builder.Services.AddSignalR();

builder.Services.AddControllers().AddNewtonsoftJson(x =>
{
	x.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
}).AddJsonOptions(options =>
	options.JsonSerializerOptions.PropertyNamingPolicy = null);

/*.AddJsonOptions(x =>
	x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);*/



/*builder.Services.AddNewtonsoftJson(options =>
	options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);*/

builder.Services.AddSwaggerGen();

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
	//options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
	options.UseNpgsql("Server=hootydb.postgres.database.azure.com;Database=postgres;Port=5432;User Id=hooty_admin@hootydb;Password=FBZ4rm$2;Ssl Mode=VerifyCA;");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("CorsPolicy");

app.MapControllerRoute(
	name: "default",
	pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.Run();
