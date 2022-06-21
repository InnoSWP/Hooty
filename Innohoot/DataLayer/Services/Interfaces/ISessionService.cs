using Innohoot.DTO;
using Innohoot.Models.Activity;

namespace Innohoot.DataLayer.Services.Implementations;

public interface ISessionService
{
	Task<List<Session>?> GetAllSessionsByUserId(Guid userId);
	Task Delete(Guid Id);
	Task<SessionDTO?> Get(Guid Id);
	Task Update(SessionDTO sessionDTO);
	Task<Guid> Create(SessionDTO sessionDTO);
	Task<SessionDTO?> GetByAccessCode(string accessCode);
}