----------------------------------------------------------------------------------------------------------------------------------------------
|	PARCIAL 2:
|
|	Profesor: Damián Rosso
|	Alumno: Emilio Martinez
----------------------------------------------------------------------------------------------------------------------------------------------

Desarrollar una aplicación con Asp.net Core y Angular. Tomar como modelo lo visto en el primer parcial

1- Construir el backend de la aplicación: utilizando APIs y Entity Framework.
2- Crear las vistas en Angular para el listado de datos.
3- Crear las vistas de edición en Angular. 

Conocimientos para la realización del parcial:

Se evalúa los conceptos de la segunda parte de la cursada en cuanto a controllers, tipos de retorno, rutas, etc. Entity Framework consultas básicas y creación de migraciones.

Se evalúa los conceptos de Angular de componentes, módulos, servicios, directivas e interfaces. Utilización del comando ng generate. Desarrollo de servicios. Importar y exportar componentes y módulos. 
Utilización de servicios dentro de componentes. Inyección de dependencias. Diseño básico de vistas. Validaciones de formularios.

Todos los parciales se aprueban subiendo el código a la tarea del classroom y haciendo una presentación del mismo

----------------------------------------------------------------------------------------------------------------------------------------------
| BASE DE DATOS: 
----------------------------------------------------------------------------------------------------------------------------------------------
- Nombre de la base: saintseiya
- ConnectionString del appsettings.json: "Server=(local)\\SQLEXPRESS;Database=saintseiya;user=emilio;password=test;"
- INSERT para pruebas:

INSERT INTO [dbo].[Caballeros] VALUES ('Bronce',	'Seiya',	'Pegaso',		'todas',	'Bronce',	'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Bronce',	'Hyoga',	'Cisne',		'todas',	'Bronce',	'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Bronce',	'Shiriu',	'Dragon',		'todas',	'Bronce',	'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Bronce',	'Ikki',		'Fenix',		'todas',	'Bronce',	'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Bronce',	'Shun',		'Andromeda',	'todas',	'Bronce',	'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Oro',		'Milo',		'Escorpio',		'12 casas', 'Oro',		'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/milo2.jpg'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Oro',		'Aldebaran','Tauro',		'12 casas',	'Oro',		'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/aldebaran.jpg'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Oro',		'Aiyoria',	'Leo',			'12 casas',	'Oro',		'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/aiyoria.jpg'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Oro',		'Mu',		'Aries',		'12 casas',	'Oro',		'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/mu.jpg'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Oro',		'Camus',	'Acuario',		'12 casas',	'Oro',		'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/camus.jpg'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Asgard',	'Sigrfied',	'Dubhe Alfa',	'Asgard',	'Asgard',	'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/sidfrid.png'); 
INSERT INTO [dbo].[Caballeros] VALUES ('Asgard',	'Hagen',	'Merak Beta',	'Asgard',	'Asgard',	'https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/hagen.png'); 

----------------------------------------------------------------------------------------------------------------------------------------------
| BACKEND: WebApi y Aplicacion de Libreria de Clase
----------------------------------------------------------------------------------------------------------------------------------------------

CODE FIRST

WebApi y Aplicacion de Libreria de Clase: vamos a tener los datos de un lado y la APi en otro.
El conection string estará en el lado de la APi.

	1.- Crear una solucion; crear archivo de solucion. Con visual studio es crear una solucion en blanco: en visual studio code se crea con dotnet new sln

	2.- Crear proyecto para persistencia de datos de tipo libreria de clase: Con dotnet new -l podemos ver todas las template instaladas que se pueden crear
	    	Ejecutamos el tipo classlibrary, le pasamos -o y el nombre (alli va el dbcontext y los modelos): dotnet new classlib -o SaintsClassLib

	3.- Crear el proyecto de webApi, configurar todas las apis que consumirar el proyecto de libreria de clase: dotnet new webapi -o SaintsWebApi --no-https
	
	4.- Agregar estos dos proyectos a la Solucion: 
		dotnet sln ClassLib_WebApi.sln add SaintsClassLib
		dotnet sln ClassLib_WebApi.sln add SaintsWebApi

	5.- Tenemos que crear una referencia; vincular ambos proyectos. En este caso tenemos que webapi que es el que comienza la aplicacion, utiliza el proyecto de persistencia. 
	    Por lo tanto, hay que agregar la referencia en el proyecto webApi.

	    dotnet add SaintsWebApi reference SaintsClassLib

	6.- Agregamos los paquetes de entity framework para que podamos consultar la base de datos.
		
	    La persistencia tambien podria separarse en capas (ejemplo: capa de servicios, capa de manager, etc)	
	    Estos paquetes hay que instalarlos en cada aplicacion que quiera utilizar entity framework

	    Ejecutar estos comandos en ambos proyectos (SaintsClassLib, SaintsWebApi)	    

	    dotnet add package Microsoft.EntityFrameworkCore.SqlServer
            dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
            dotnet add package Microsoft.EntityFrameworkCore.Design 

	7.- SaintsClassLib ------------------------------------------- Crear DBCONTEXT: carpeta del proyecto classLib
		using System;
		using Microsoft.EntityFrameworkCore;
		using Microsoft.EntityFrameworkCore.Metadata;
		
		-- Con scaffolding se crea de forma automatica
		using System;
		using Microsoft.EntityFrameworkCore;
		using Microsoft.EntityFrameworkCore.Metadata;
		using SaintsClassLib.Models;

		namespace SaintsClassLib
		{
			public class CaballerosDbContext : DbContext
			{
				public virtual DbSet<Caballero> Caballeros{get;set;}
				public virtual DbSet<Armadura> Armaduras{get;set;}
				public virtual DbSet<Saga> Sagas{get;set;}
				//Agregamos un constructor
				public CaballerosDbContext(){

				}
				public CaballerosDbContext(DbContextOptions<CaballerosDbContext> options):base(options){

				}
				protected override void OnModelCreating(ModelBuilder modelBuilder){
					base.OnModelCreating(modelBuilder);

				}
				// En este metodo se puede agregar el connection string. Se pueden setear otras opciones. Permite setear el conection string y no es necesario que se agregue
				// en otro archivo. Hay que configurarlo igual
				protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
					base.OnConfiguring(optionsBuilder);
				}
			}
		}
		
	8.- SaintsWebApi ------------------------------------------- Crear conexion DB pasando nuestras credenciales. Se configura en el archivo appsettings

	    {
		  "ConnectionStrings": {
			"ComercioConnectionString":
			"Server=(local)\\SQLEXPRESS;Database=saintseiya;user=emilio;password=test;"
		  },
		  "Logging": {
			"LogLevel": {
			  "Default": "Information",
			  "Microsoft": "Warning",
			  "Microsoft.Hosting.Lifetime": "Information"
			}
		  },
		  "AllowedHosts": "*"
		}
		
		
		
		
	9.- Agregar los modelos: En el proyecto classLib, crear carpeta Models y las clases de cada modelo
	
	using System.Collections.Generic;
	namespace SaintsClassLib.Models
	{
		public class Caballero
		{
			public int Id {set; get;}
			public string Type {set; get;}
			public string Name {set; get;}
			public string Constellation {set; get;}
			public List<Saga> Saga{get;set;}
			public List<Armadura> Armor{get;set;}
			public string Thumbnail {set; get;}
		}
	}
	
	using System.Collections.Generic;
	namespace SaintsClassLib.Models
	{
		public class Armadura
		{
			public int Id {set; get;}
			public string Type {set; get;}
			public string Name {set; get;}
		}
	}
	
	using System.Collections.Generic;
	namespace SaintsClassLib.Models
	{
		public class Saga
		{
			public int Id {set; get;}
			public string Name {set; get;}
		}
	}
	
	
	10.- Ya tenemos creadas las clases y modelos; vamos de nuevo al dbContext para agregar los dbSETs que se necesitan para hacer la migracion:
	Estos DBSet son los que se miran para ejecutar las migraciones a la base de datos, si hay mas modelos agregados pero no estan los dbset no se migran.
	En caso de hacer algun cambio en alguno de los modelos agregados en el dbset, se corre la migracion y se toma el nuevo dato. Se agrega la nueva tabla o la columna
	
	using System;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.EntityFrameworkCore.Metadata;
	using SaintsClassLib.Models;

	namespace SaintsClassLib
	{
		public class CaballerosDbContext : DbContext
		{
			public virtual DbSet<Caballero> Caballeros{get;set;}
			public virtual DbSet<Armadura> Armaduras{get;set;}
			public virtual DbSet<Saga> Sagas{get;set;}
			//Agregamos un constructor
			public CaballerosDbContext(){

			}
			public CaballerosDbContext(DbContextOptions<CaballerosDbContext> options):base(options){

			}
			protected override void OnModelCreating(ModelBuilder modelBuilder){
				//base.OnModelCreating(modelBuilder);

			}
		}
	}
	
	
	11.- SaintsWebApi ------------------------------------------- Inyectar las dependencias en el Startup.cs
	
		using SaintsClassLib;
		using Microsoft.EntityFrameworkCore;
		
			Agregamos el servicio:
		
		services.AddDbContext<CaballerosDbContext>(options =>
		{
			options.UseSqlServer(Configuration.GetConnectionString("ComercioConnectionString"));
		});
		
		
	12.- Correr la migracion
	
	En la carpeta de la solucion corremos la solucion (indicamos el proyecto donde se ejcutará la migracion, y el proyecto en el que encontrara el conection string)
		dotnet ef migrations add Initial --project SaintsClassLib/SaintsClassLib.csproj --startup-project SaintsWebApi/SaintsWebApi.csproj
		Build started...
		Build succeeded.
		Done. To undo this action, use 'ef migrations remove'

	Persistimos la estructura en la base de datos
		dotnet ef database update --project SaintsClassLib/SaintsClassLib.csproj --startup-project SaintsWebApi/SaintsWebApi.csproj
		Build started...
		Build succeeded.
		Done.
	
	
	13.- SaintsWebApi ------------------------------------------- crear los controladores a partir del dbcontext
		TOOL:
		dotnet tool install -g dotnet-aspnet-codegenerator
		Tool 'dotnet-aspnet-codegenerator' is already installed.
		
		COMANDO:
		Comando para crear los controladores a partir del dbcontext; es una plantilla sencilla que puede irse modificando; le pasamos nombre del controlador, tipo de controlador (api), a traves de cual
		modelo 

		dotnet aspnet-codegenerator controller -name CaballerosController -api -m Caballero -dc CaballerosDbContext -outDir Controllers
		
		
	14.- MIGRACION, PERSISTENCIA, Controllers
		RAIZ: dotnet ef migrations add Initial --project SaintsClassLib/SaintsClassLib.csproj --startup-project SaintsWebApi/SaintsWebApi.csproj
		RAIZ: dotnet ef database update --project SaintsClassLib/SaintsClassLib.csproj --startup-project SaintsWebApi/SaintsWebApi.csproj  
		WEBAPI: dotnet aspnet-codegenerator controller -name CaballerosController -api -m Caballero -dc CaballerosDbContext -outDir Controllers
		WEBAPI: dotnet aspnet-codegenerator controller -name ArmadurasController -api -m Armadura -dc CaballerosDbContext -outDir Controllers
		WEBAPI: dotnet aspnet-codegenerator controller -name SagasController -api -m Saga -dc CaballerosDbContext -outDir Controllers     

	15.- Agregar directivas CORS En el archivo Startup.cs
		// This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>{
                options.AddPolicy(
                    "CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SaintsWebApi", Version = "v1" });
            });
            services.AddDbContext<CaballerosDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("ComercioConnectionString"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SaintsWebApi v1"));
                app.UseCors(x=> x
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
		
----------------------------------------------------------------------------------------------------------------------------------------------
| FRONTEND: Observables - llamado a las APIs
----------------------------------------------------------------------------------------------------------------------------------------------
