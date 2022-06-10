using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DataLayer.Services.Interfaces;
using Innohoot.DTO;

using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("Users")]
	[ApiController]
	public class UserController:Controller
	{
		private readonly IUserService _userService;
		private readonly IPollCollectionService _pollCollectionService;
		private readonly IDBRepository _db;

		public UserController(IUserService userService, IPollCollectionService pollCollectionService, IDBRepository db)
		{
			_userService = userService;
			_pollCollectionService = pollCollectionService;
			_db = db;
		}

		[HttpPost]
		public async Task<IActionResult> Create(UserDTO userDTO)
		{
			return Ok(await _userService.Create(userDTO));
		}

		[HttpGet]
		public async Task<IActionResult> Get(Guid Id)
		{
			return Ok(await _userService.Get(Id));
		}

		[HttpGet("PollCollections")]
		public async Task<List<PollCollectionDTO>> GetAllPollCollectionByUserId(Guid Id)
		{
			return await _pollCollectionService.GetAllPollCollectionByUserId(Id);
		}
	}
}
