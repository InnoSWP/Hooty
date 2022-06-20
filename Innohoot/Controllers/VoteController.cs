using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	public class VoteController : Controller
	{
		private readonly IPollService _pollService;
		private readonly ISessionService _sessionService;
		private readonly IVoteRecordService _voteRecordServiceService;

		public VoteController(IPollService pollService, ISessionService sessionService, IVoteRecordService voteRecordServiceService)
		{
			_pollService = pollService;
			_sessionService = sessionService;
			_voteRecordServiceService = voteRecordServiceService;
		}

		[HttpGet("voteresult")]
		public async Task<IActionResult> GetVoteResult([FromQuery] Guid sessionId, [FromQuery] Guid pollId)
		{
			var result = await _voteRecordServiceService.GiveVoteResult(sessionId, pollId);
			return Ok(result);
		}

		[HttpPut]
		public async Task<IActionResult> AddVote(VoteRecordDTO voteRecordDTO)
		{
			var result = await _voteRecordServiceService.AddVoteRecord(voteRecordDTO);
			return Ok(result);
		}
	}
}
