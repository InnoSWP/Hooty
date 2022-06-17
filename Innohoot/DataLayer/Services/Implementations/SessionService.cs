using AutoMapper;
using Innohoot.DTO;
using Innohoot.Models.Activity;
using Innohoot.Models.Identity;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class SessionService : ISessionService
	{
		protected readonly IMapper _mapper;
		protected readonly IDBRepository _db;
		public SessionService(IDBRepository repository, IMapper mapper)
		{
			_db = repository;
			_mapper = mapper;
		}

		public async Task<List<Session>?> GetAllSessionsByUserId(Guid userId)
		{
			return await _db.GetAll<Session>().Where(session => session.UserId.Equals(userId)).ToListAsync();
		}

		public async Task Delete(Guid Id)
		{
			await _db.Delete<Session>(Id);
			await _db.Save();
		}

		public async Task<SessionDTO?> Get(Guid Id)
		{
			var session = await _db.Get<Session>(x => x.Id==Id).FirstOrDefaultAsync();
			return _mapper.Map<SessionDTO>(session);
		}

		public Task Update(Session entity)
		{
			throw new NotImplementedException();
		}

		public async Task<Guid> Create(SessionDTO sessionDTO)
		{
			var session = _mapper.Map<Session>(sessionDTO);
			session.User = new User() { Id = session.UserId };
			_db.Context.Entry(session.User).State = EntityState.Unchanged;

			await _db.Add(session);
			await _db.Save();

			return session.Id;
		}
	}
}
