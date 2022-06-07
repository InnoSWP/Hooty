using Innohoot.Models.Identity;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IUserService
{
	Task<Guid> Create(User entity);
	Task Delete(Guid entityId);
	Task<User?> Get(Guid entityId);
	Task Update(User entity);
}