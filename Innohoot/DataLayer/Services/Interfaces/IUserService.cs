using Innohoot.DTO;

namespace Innohoot.DataLayer.Services.Interfaces
{
	public interface IUserService
	{
		Task<Guid> Create(UserDTO userDTO);
		Task Delete(Guid Id);
		Task<UserDTO?> Get(Guid Id);
		Task Update(UserDTO userDTO);
	}
}