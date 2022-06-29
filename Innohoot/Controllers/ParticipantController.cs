using Constants;

using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;

using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	public class ParticipantController : Controller
	{
		private readonly IPollService _pollService;
		private readonly ISessionService _sessionService;
		private readonly IVoteRecordService _voteRecordService;

		public ParticipantController(IPollService pollService, ISessionService sessionService, IVoteRecordService voteRecordService)
		{
			_pollService = pollService;
			_sessionService = sessionService;
			_voteRecordService = voteRecordService;
		}

		[HttpGet("{sessionId}/{participantName}")]
		public async Task<IActionResult> GetActionView(Guid sessionId, string participantName)
		{
			var session = await _sessionService.Get(sessionId);

			if (session is not null)
			{
				var particapantViews = new List<ParticapantView>();

				//fill all views that will display result
				if (session.ShowResultPoll.Count > 0)
				{
					foreach (var showPollId in session.ShowResultPoll)
					{
						var particapantView = new ParticapantView();
						particapantView.ActionEnum = ParticipantActionEnum.DisplayResults;

						particapantView.Poll = await _pollService.Get(showPollId);

						var vote = await _voteRecordService.GetVoteByParticipant(showPollId, participantName);
						particapantView.ChosenOptionId = vote.OptionId;

						particapantViews.Add(particapantView);
					}
				}

				// have form for submit
				if (session.ActivePollId is not null)
				{
					var particapantView = new ParticapantView();
					particapantView.ActionEnum = ParticipantActionEnum.SubmitVote;

					particapantView.Poll = await _pollService.Get((Guid)session.ActivePollId);


					// to not show answer
					foreach (var option in particapantView.Poll.Options)
					{
						option.IsAnswer = false;
					}

					particapantView.ChosenOptionId = null;

					particapantViews.Add(particapantView);
				}

				return Ok(particapantViews);
			}

			return Problem("Session is not active");
		}

		/// <summary>
		/// Checks if the name of a particular session is not occupied.
		/// If it is not occupied, then writes it to the list of participants of the session.
		/// </summary>
		/// <param name="name"></param>
		/// <returns></returns>
		[HttpPost("{sessionId}")]
		public async Task<IActionResult> SubmitName([FromRoute] Guid sessionId, [FromBody] object? name)
		{
			string participantName;
			if (name is not null && name is string)
				participantName = name.ToString();
			else
				return BadRequest("Name is not string");

			var session = await _sessionService.Get(sessionId);

			if (!session.ParticipantList.Contains(participantName))
			{
				session.ParticipantList.Add(participantName);
				await _sessionService.Update(session);
				return Ok();
			}
			else
				return BadRequest("Name is occupied");
		}

	}
}
