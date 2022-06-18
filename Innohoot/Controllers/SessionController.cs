using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DataLayer.Services.Interfaces;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	public class SessionController : Controller
	{
		private readonly ISessionService _sessionService;
		private readonly IPollCollectionService _pollCollectionService;
		private readonly IUserService _userService;


		public SessionController(ISessionService sessionService, IPollCollectionService pollCollectionService, IUserService userService)
		{
			_sessionService = sessionService;
			_pollCollectionService = pollCollectionService;
			_userService = userService;
		}

		[HttpGet]
		public async Task<IActionResult> Get(Guid Id)
		{
			return Ok(await _sessionService.Get(Id));
		}
		[HttpPost]
		public async Task<IActionResult> Create(SessionDTO sessionDTO)
		{
			return Ok(await _sessionService.Create(sessionDTO));
		}
		[HttpPut]
		public async Task<IActionResult> Update(SessionDTO sessionDTO)
		{
			await _sessionService.Update(sessionDTO);
			return NoContent();
		}

		[HttpDelete]
		public async Task<IActionResult> Delete(Guid Id)
		{
			await _sessionService.Delete(Id);
			return NoContent();
		}

		/// <summary>
		/// Create new Session for User in base of pollCollection
		/// </summary>
		/// <param name="pollCollectionId"></param>
		/// <returns></returns>
		[HttpGet("active")]
		public async Task<IActionResult> StartSession(Guid pollCollectionId)
		{
			var pollCollectionDTO = await _pollCollectionService.Get(pollCollectionId);

			if (pollCollectionDTO is not null)
			{
				var session = await _sessionService.Create(new SessionDTO()
				{
					UserId = pollCollectionDTO.UserId,
					Name = pollCollectionDTO.Name,
					Created = DateTime.Now.ToUniversalTime(),
					PollCollectionId = pollCollectionDTO.Id,
					IsActive = true
				});

				return Ok(session);
			}
			else return Problem();
		}

	}
}
