using Innohoot.DTO;

namespace Innohoot.DataLayer.Services.Interfaces
{
	public interface IUserService
	{
		Task<Guid> Create(UserDTO userDTO);
		Task Delete(Guid Id);
		Task<UserDTO?> Get(Guid Id);
		/// <summary>
		/// Searches for a user by username and password hash.
		/// </summary>
		/// <param name="userDTO"></param>
		/// <returns>Returns the user ID, if found. If not found, it returns null.</returns>
		Task<Guid?> GetId(UserDTO userDTO);
	}
}