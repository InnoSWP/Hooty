using Innohoot.Models.Identity;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class UserService:CRUDService<User>, IUserService
	{
		public UserService(IDBRepository repository) : base(repository) { }
	}
}
