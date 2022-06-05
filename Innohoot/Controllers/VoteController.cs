using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.Models.ElementsForPA;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	/// <summary>
	/// Controller for voting by participant 
	/// </summary>
	public class VoteController : Controller
	{
		private readonly IPollService _pollService;
		public VoteController(IPollService pollService)
		{
			_pollService = pollService;
		}

		[HttpPost("{id}")]
		public async IActionResult AddVote([NotNull] Guid sessionId, [NotNull] Guid pollId, [NotNull] Guid optionId, [NotNull] string participantName)
		{
			var poll = await _pollService.Get(pollId);
			var vote = new VoteRecord() { ParticipantName = participantName, ChosenOption = poll.Options.FirstOrDefault(o => o.Id == optionId) };

			return Ok();
		}

		[HttpGet("{id}")]
		public IEnumerable<> GetVoteResults(int id)
		{

		}
	}
}
