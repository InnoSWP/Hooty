using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices;
using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
		public async Task<IActionResult> GetVoteResult([FromQuery] Guid userId, [FromQuery] Guid pollId)
		{
			var result = await _voteRecordServiceService.GiveVoteResult(userId, pollId);
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
