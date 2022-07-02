using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DataLayer.Services.Interfaces;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace UnitTest
{
	[TestCaseOrderer("TestOrderExamples.TestCaseOrdering.AlphabeticalOrderer", "TestOrderExamples")]
	[Collection("Initialization")]
	public class TestSession : IClassFixture<DatabaseFixture>
	{
		public DatabaseFixture Fixture { get; }

		public TestSession(DatabaseFixture fixture)
		{
			Fixture = fixture;
		}

		[Fact]
		public async Task Create1Session_ShouldReturnAsPassed()
		{
			await using var context = Fixture.CreateContext();

			var dbPollCollection = await context.Set<PollCollection>()
				.Where(x => x.UserId == new Guid("625f9b62-cf17-4455-8cb1-2ac4d2b626d2")).FirstOrDefaultAsync();

			var mySession = new Session()
			{
				PollCollectionId = new Guid("99bbc0a4-1bb0-4e4d-961d-53bec51f3b9b"),
				UserId = new Guid("625f9b62-cf17-4455-8cb1-2ac4d2b626d2"),
				Name = "First session",
				IsActive = true,
				StarTime = DateTime.Now.ToUniversalTime()
			};

			context.Add(mySession);
			context.SaveChanges();

			var dbSession = await context.Set<Session>()
				.Where(x => x.UserId == mySession.UserId && x.Name.Equals("First session")).FirstOrDefaultAsync();

			Assert.Equal(mySession.Name, dbSession.Name);
			Assert.Equal(mySession.UserId, dbSession.UserId);
			Assert.Equal(mySession.PollCollection.Id, dbSession.PollCollectionId);

		}

		[Fact]
		public async Task Create2SecondSessionShouldReturnItAsActive()
		{
			await using var context = Fixture.CreateContext();

			var dbPollCollection = await context.Set<PollCollection>()
				.Where(x => x.UserId == new Guid("625f9b62-cf17-4455-8cb1-2ac4d2b626d2")).FirstOrDefaultAsync();

			var mySession = new Session()
			{
				PollCollectionId = new Guid("99bbc0a4-1bb0-4e4d-961d-53bec51f3b9b"),
				UserId = new Guid("625f9b62-cf17-4455-8cb1-2ac4d2b626d2"),
				Name = "Second session",
				IsActive = true,
				StarTime = DateTime.Now.ToUniversalTime()
			};

			
			context.Add(mySession);
			context.SaveChanges();

			var dbSession = await context.Set<Session>()
				.Where(x => x.UserId == mySession.UserId && x.Name.Equals("Second session")).FirstOrDefaultAsync();

			Assert.Equal(mySession.Name, dbSession.Name);
			Assert.Equal(mySession.UserId, dbSession.UserId);
			Assert.Equal(mySession.PollCollection.Id, dbSession.PollCollectionId);
		}
	}
}
