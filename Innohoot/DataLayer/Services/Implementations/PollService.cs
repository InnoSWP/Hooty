using Innohoot.Models.Activity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class PollService : IPollService
	{
		private readonly IDBRepository _db;
		public PollService(IDBRepository repository)
		{
			_db = repository;
		}
		public async Task<Guid> Create(Poll poll )
		{
			await _db.Add(poll);
			await _db.Save();
			return poll.Id;
		}

		public async Task Delete(Guid pollId)
		{
			await _db.Delete<Poll>(pollId);
			await _db.Save();
		}

		public async Task<Poll?> Get(Guid pollId)
		{
			return await _db.Get<Poll>(pollId).FirstOrDefaultAsync();
		}

		public async Task<List<Poll>?> GetAllPollsByUserId(Guid userId)
		{
			return await _db.GetAll<Poll>().Where(poll => poll.UserId.Equals(userId)).ToListAsync();
		}
		public async Task Update(Poll poll)
		{
			await _db.Update(poll);
			await _db.Save();
		}
    }
}
