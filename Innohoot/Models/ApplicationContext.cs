using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer
{
	public class ApplicationContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Poll> Polls { get; set; }
		public DbSet<VoteRecord> VoteRecords { get; set; }
		public DbSet<Option> Options { get; set; }
		public DbSet<Session> Sessions { get; set; }
		public DbSet<PollCollection> PollCollections { get; set; }

		public ApplicationContext(DbContextOptions options) : base(options)
		{
			Database.Migrate();
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

		}

		public DbSet<T> DbSet<T>() where T : class
		{
			return Set<T>();
		}

		public new IQueryable<T> Query<T>() where T : class
		{
			return Set<T>();
		}
	}
}
