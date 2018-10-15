using System;
using Microsoft.EntityFrameworkCore;
using AccountingSystemProject.Models;

namespace AccountingSystemProject.Entity
{
    public class EntityContext : DbContext
    {
        private const string ConnectionString = "Filename=./Database/AccountingSystemDB.sqlite3";

        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expense {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Specify the path of the database here
            optionsBuilder.UseSqlite(ConnectionString);
        }

    }
}
