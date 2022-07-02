using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Innohoot.DataLayer;
using Innohoot.Models.Identity;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace UnitTest
{
	public class DatabaseFixture : IDisposable
	{

		private static readonly object _lock = new();
		private static bool _databaseInitialized;

		public DatabaseFixture()
		{
			lock (_lock)
			{
				if (!_databaseInitialized)
				{
					using (var context = CreateContext())
					{
						context.Database.EnsureDeleted();
						context.Database.EnsureCreated();

						// ... initialize data in the test database ...
						context.Add(new User()
						{
							Id = new Guid("625f9b62-cf17-4455-8cb1-2ac4d2b626d2"),
							Login = "Misha",
							PasswordHash = "123"
						});

						context.SaveChanges();
					}

					_databaseInitialized = true;
				}
			}
		}

		public void Dispose()
		{
			// ... clean up test data from the database ...
		}

		public ApplicationContext CreateContext()
		=> new ApplicationContext(
			new DbContextOptionsBuilder<ApplicationContext>()
				.UseNpgsql("Host=localhost;Port=5432;Database=HootyDBTest;Username=postgres;Password=FBZ4rm$2;")
				.Options);
	}

	public class MyDatabaseTests : IClassFixture<DatabaseFixture>
	{
		DatabaseFixture fixture;

		public MyDatabaseTests(DatabaseFixture fixture)
		{
			this.fixture = fixture;
		}

		// ... write tests, using fixture.Db to get access to the SQL Server ...
	}
}
