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
