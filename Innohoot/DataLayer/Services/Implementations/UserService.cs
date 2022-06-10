using AutoMapper;

using Innohoot.DataLayer.Services.Interfaces;
using Innohoot.DTO;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;

using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class UserService:IUserService
	{
		protected readonly IMapper _mapper;
		protected readonly IDBRepository _db;

		public UserService(IDBRepository repository, IMapper mapper)
		{
			_db = repository;
			_mapper = mapper;
		}

		public async Task<Guid> Create(UserDTO userDTO)
		{
			var user = _mapper.Map<User>(userDTO);

			await _db.Add(user);
			await _db.Save();
			return user.Id;
		}

		public async Task Delete(Guid Id)
		{
			await _db.Delete<User>(Id);
			await _db.Save();
		}

		public async Task<UserDTO?> Get(Guid Id)
		{
			var user = await _db.Get<User>(Id).FirstOrDefaultAsync();
			return _mapper.Map<UserDTO>(user);
		}

	}
}
