using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace UnitTest
{
	[Collection("Initialization")]
	public class TestPollCollection : IClassFixture<DatabaseFixture>
	{
		public DatabaseFixture Fixture { get; }

		public TestPollCollection(DatabaseFixture fixture)
			=> Fixture = fixture;

		[Fact]
		public async Task CreatePollCollection_ShouldReturnAsWePassed()
		{
			await using var context = Fixture.CreateContext();

			var myPollCollection = new PollCollection()
			{
				Id = new Guid("99bbc0a4-1bb0-4e4d-961d-53bec51f3b9b"),
				UserId = new Guid("625f9b62-cf17-4455-8cb1-2ac4d2b626d2"),
				Name = "First test",

				Polls = new List<Poll>()
				{
					new Poll()
					{
						Id = new Guid("045c7ddb-b33d-48cc-b35e-247e1d25d1da"),
						Name = "How much is 2+2?",
						OrderNumber = 1,
						Options = new List<Option>()
						{
							new Option()
							{
								Name = "4",
								PollId = new Guid("045c7ddb-b33d-48cc-b35e-247e1d25d1da"),
								IsAnswer = true
							},

							new Option()
							{
								Name = "5",
								PollId = new Guid("045c7ddb-b33d-48cc-b35e-247e1d25d1da"),
								IsAnswer = false
							}
						}
					}
				}
			};

			context.Add(myPollCollection);
			context.SaveChanges();

			var dbPollCollection = await context.Set<PollCollection>()
				.Where(x => x.UserId == myPollCollection.UserId).FirstOrDefaultAsync();

			Assert.Equal(myPollCollection.Id, dbPollCollection.Id);
			Assert.Equal(myPollCollection.Name, dbPollCollection.Name);
			Assert.Equal(myPollCollection.UserId, dbPollCollection.UserId);
			Assert.Equal(myPollCollection.Polls[0].Options[0].Name, dbPollCollection.Polls[0].Options[0].Name);

		}
	}
}