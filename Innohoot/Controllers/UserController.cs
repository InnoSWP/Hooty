using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class UserController:Controller
	{
		private readonly IUserService _userService;
		private readonly IDBRepository _db;

		public UserController(IUserService userService,  IDBRepository db)
		{
			_userService = userService;
			_db = db;
		}

		[HttpPost]
		public async Task<IActionResult> Create(UserDTO userDTO)
		{
			return Ok(await _userService.Create(userDTO));
		}
	}
}
