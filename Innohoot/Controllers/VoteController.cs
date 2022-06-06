using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Innohoot.Controllers
{
	/// <summary>
	/// Controller for voting by participant 
	/// </summary>
	[Route("[controller]")]
	public class VoteController : Controller
	{
		private readonly IPollService _pollService;
		private readonly ISessionService _sessionService;
		public VoteController(IPollService pollService, ISessionService sessionService)
		{
			_pollService = pollService;
			_sessionService = sessionService;
		}

		/// <summary>
		/// Add voteRecord to DB based on name and poll, remember that voteRecords do not know about Session, but Session has List of VoteRecords
		/// </summary>
		/// <param name="sessionId"></param>
		/// <param name="pollId"></param>
		/// <param name="participantName"></param>
		/// <param name="optionId"></param>
		/// <returns></returns>
		[HttpPut]
		public async Task<IActionResult> AddVoteRecord([NotNull] Guid sessionId, [NotNull] Guid pollId, [NotNull] string participantName, Guid optionId)
		{
			var poll = await _pollService.Get(pollId);
			var session = await _sessionService.Get(sessionId);

				//check if where exist record with given name in given session for given poll 
				VoteRecord voteRecord = session.VoteRecords.FirstOrDefault(x => x.ParticipantName.Equals(participantName) && x.ChosenOption.Poll.Id.Equals(pollId));
				if (voteRecord  != null )
				{ 
					//we update record
					voteRecord.ChosenOption =
						optionId == null ? null : poll.Options.FirstOrDefault(o => o.Id == optionId);
				}
				else
				{
					//we add new record
					 voteRecord = new VoteRecord()
						{ ParticipantName = participantName, ChosenOption = poll.Options.FirstOrDefault(o => o.Id == optionId) };

					session.VoteRecords.Add(voteRecord);
				}

				await _sessionService.Update(session);

				return Ok();
		}

		[HttpGet]
		public async Task<IActionResult> GetVoteRecords([NotNull] Guid sessionId, [NotNull] Guid pollId)
		{
			var session = await _sessionService.Get(sessionId);
			var poll = await _pollService.Get(pollId);

			//take all records about given poll-question
			var voteRecords =  session.VoteRecords.Where(x => x.ChosenOption.PollId.Equals(pollId));

			Dictionary<Option, int> result = new();
			List<Option> options = poll.Options;
			foreach (var option in options)
			{
				int number = voteRecords.Where(x => x.ChosenOption.Id.Equals(option.Id)).ToList().Capacity;
				result[option] = number;
			}

			//return new JsonResult(JsonConvert.SerializeObject(result));
			return new JsonResult(result);
		}
	}
}
