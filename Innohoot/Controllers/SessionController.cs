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

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(string id)
		{
			SessionDTO sessionDTO = null;
			try
			{
				var guid = new Guid(id);
				sessionDTO = await _sessionService.Get(guid);
			}
			catch
			{
				var accessCode = id;
				sessionDTO = await _sessionService.GetByAccessCode(accessCode);
			}

			if (sessionDTO == null)
				return Problem("Session not found");
			else return Ok(sessionDTO);
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
		/// <param name="accessCode"></param>
		/// <returns></returns>
		[HttpGet("start")]
		public async Task<IActionResult> StartSession(Guid pollCollectionId, string? accessCode)
		{
			var pollCollectionDTO = await _pollCollectionService.Get(pollCollectionId);

			if (pollCollectionDTO is not null)
			{
				var sessionId = await _sessionService.Create(new SessionDTO()
				{
					UserId = pollCollectionDTO.UserId,
					AccessCode = accessCode,
					Name = pollCollectionDTO.Name,
					StarTime = DateTime.Now.ToUniversalTime(),
					Created = DateTime.Now.ToUniversalTime(),
					PollCollectionId = pollCollectionDTO.Id,
					IsActive = true,
					ShowResultPoll = new List<Guid>()
				});

				return Ok(sessionId);
			}
			else return Problem();
		}

		[HttpPut("{sessionId}/close")]
		public async Task<IActionResult> CloseSession(Guid sessionId)
		{
			var sessionDTO = await _sessionService.Get(sessionId);
			if (sessionDTO is not null)
			{
				sessionDTO.IsActive = false;
				sessionDTO.ActivePollId = null;
				sessionDTO.AccessCode = null;
				sessionDTO.ShowResultPoll = new List<Guid>();
				await _sessionService.Update(sessionDTO);
				return Ok();
			}
			else
			{
				return Problem("No such Session");
			}
		}

	}
}
