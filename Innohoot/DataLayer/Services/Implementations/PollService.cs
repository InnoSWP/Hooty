using Innohoot.Models.Activity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class PollService:CRUDService<Poll>, IPollService
	{
		public PollService(IDBRepository repository) : base(repository) { }
		public async Task<List<Poll>?> GetAllPollsByUserId(Guid userId)
		{
			return await _db.GetAll<Poll>().Where(poll => poll.UserId.Equals(userId)).ToListAsync();
		}
	}
}
