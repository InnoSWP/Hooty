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
		private readonly IVoteRecordService _voteRecordService;

		public PollController(IPollService pollService, ISessionService sessionService, IVoteRecordService voteRecordService)
		{
			_pollService = pollService;
			_sessionService = sessionService;
			_voteRecordService = voteRecordService;
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
	}
}
