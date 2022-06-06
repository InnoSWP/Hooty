using Innohoot.Models.Activity;

namespace Innohoot.DataLayer.Services.Implementations;

public interface ISessionService
{
	Task<List<Session>?> GetAllSessionsByUserId(Guid userId);
	Task<Guid> Create(Session entity);
	Task Delete(Guid entityId);
	Task<Session?> Get(Guid entityId);
	Task Update(Session entity);
}