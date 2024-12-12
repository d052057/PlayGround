using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.DependencyInjection;
using System;
using Microsoft.EntityFrameworkCore;
using PlayGround.Server.Models;
using PlayGround.Server.Services;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDirectoryBrowser();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<WebDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("playGroundDb"));
});

builder.Services.AddScoped<IRpmServices, RpmServices>();
builder.Services.AddControllers().AddNewtonsoftJson(
               options =>
               {
                   options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                   options.SerializerSettings.TypeNameHandling = TypeNameHandling.None;
                   options.SerializerSettings.Formatting = Formatting.Indented;
               }
               )
               .AddXmlSerializerFormatters()
               .AddJsonOptions(options =>
               {
                   options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                   options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
               })
               .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver()
            );

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
var MimeProvider = new FileExtensionContentTypeProvider();
MimeProvider.Mappings[".flac"] = "audio/flac";
MimeProvider.Mappings[".flv"] = "video/x-flv";
MimeProvider.Mappings[".mkv"] = "video/mp4";
app.UseStaticFiles(new StaticFileOptions
{
   //Path.Combine (AppDomain.CurrentDomain.BaseDirectory,"mystaticfiles")
    // FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "mystaticfiles")),
    FileProvider = new PhysicalFileProvider(@"c:/medias"),
    RequestPath = "/medias",
    ContentTypeProvider = MimeProvider
});
app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
    //Path.Combine (AppDomain.CurrentDomain.BaseDirectory,"mystaticfiles")
    // FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "mystaticfiles")),
    FileProvider = new PhysicalFileProvider(@"c:/medias"),
    RequestPath = "/medias"
});
//app.UseFileServer(new FileServerOptions()
//{
//    // configuration["ApplicationSettings:MEDIAS"].ToString() is c:/medias or d:/medias
//    FileProvider = new PhysicalFileProvider(@"c:/medias"),
//    RequestPath = new Microsoft.AspNetCore.Http.PathString(@"/assets/medias"),
//    EnableDirectoryBrowsing = true // you make this true or false.
//});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
