using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DataLayer.Services.Interfaces;
using Innohoot.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	[EnableCors("CorsPolicy")]

	public class UserController:Controller
	{
		private readonly IUserService _userService;
		private readonly IPollCollectionService _pollCollectionService;
		private readonly IPollService _pollService;
		private readonly ISessionService _sessionService;
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
			try
			{
				Guid userId = await _userService.Create(userDTO);
				return Ok(userId);
			}
			catch
			{
				return BadRequest("Login is used already");
			}
		}

		[HttpPost("Login")]
		public async Task<IActionResult> Login(UserDTO userDTO)
		{
			var userId = await _userService.GetId(userDTO);

			if (userId is null)
				return BadRequest("Login or password is invalid");

			return Ok(userId);
		}

		[HttpGet]
		public async Task<IActionResult> Get(Guid userId)
		{
			var userDTO = await _userService.Get(userId);

			if (userDTO is null)
				return BadRequest("User Id is wrong");

			return Ok(userDTO);
		}

		[HttpGet("PollCollections")]
		public async Task<IActionResult> GetAllPollCollectionByUserId(Guid Id)
		{
			return new JsonResult(await _pollCollectionService.GetAllPollCollectionByUserId(Id));
			//return await _pollCollectionService.GetAllPollCollectionByUserId(Id);
		}

	}
}
