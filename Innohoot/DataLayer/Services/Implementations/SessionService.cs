using Innohoot.Models.Activity;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class SessionService : CRUDService<Session>, ISessionService
	{
		public SessionService(IDBRepository repository) : base(repository) { }

		public async Task<List<Session>?> GetAllSessionsByUserId(Guid userId)
		{
			return await _db.GetAll<Session>().Where(session => session.UserId.Equals(userId)).ToListAsync();
		}
	}
}
