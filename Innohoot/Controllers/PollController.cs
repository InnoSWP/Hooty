using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	public class PollController : Controller
	{
		private readonly IPollService _pollService;
		private readonly ISessionService _sessionService;

		public PollController(IPollService pollService, ISessionService sessionService)
		{
			_pollService = pollService;
			_sessionService = sessionService;
		}

		[HttpGet]
		public async Task<IActionResult> Get(Guid Id)
		{
			return Ok(await _pollService.Get(Id));
		}
		[HttpPost]
		public async Task<IActionResult> Create(PollDTO pollDTO)
		{
			return Ok(await _pollService.Create(pollDTO));
		}
		[HttpPut]
		public async Task<IActionResult> Update(PollDTO pollDTO)
		{
			await _pollService.Update(pollDTO);
			return NoContent();
		}

		[HttpDelete]
		public async Task<IActionResult> Delete(Guid Id)
		{
			await _pollService.Delete(Id);
			return NoContent();
		}

		[HttpPut("{id}/Active")]
		public async Task<IActionResult> SetSessionActivePoll(Guid Id)
		{
			var result = await _pollService.MakePollActive(Id);

			if (result)
			{
				return Ok();
			}

			else
			{
				return Problem("No such poll or session");
			}
		}

		[HttpGet("active")]
		public async Task<IActionResult> GetSessionActivePoll(Guid sessionId)
		{
			var session = await _sessionService.Get(sessionId);
			var pollId = session.ActivePollId;

			if (pollId is not null)
			{
				var poll = await _pollService.Get((Guid)pollId);
				return Ok(poll);
			}
			//have no active poll
			else return NoContent();
		}
	}
}
