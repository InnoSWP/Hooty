using ClosedXML.Excel;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	public class VoteController : Controller
	{
		private readonly IPollService _pollService;
		private readonly IPollCollectionService _pollCollectionService;
		private readonly ISessionService _sessionService;
		private readonly IVoteRecordService _voteRecordService;

		public VoteController(IPollService pollService, ISessionService sessionService, IPollCollectionService pollCollectionService, IVoteRecordService voteRecordService)
		{
			_pollService = pollService;
			_pollCollectionService = pollCollectionService;
			_sessionService = sessionService;
			_voteRecordService = voteRecordService;
		}

		[HttpGet("voteresult")]
		public async Task<IActionResult> GetVoteResult([FromQuery] Guid sessionId, [FromQuery] Guid pollId, [FromQuery] bool closeActivePoll = false)
		{
			var session = await _sessionService.Get(sessionId);

			if (session is not null)
			{
				session.ShowResultPoll = new List<Guid>();
				session.ShowResultPoll.Add(pollId);

				if (closeActivePoll)
					session.ActivePollId = null;

				await _sessionService.Update(session);

				var result = await _voteRecordService.GetVoteResult(sessionId, pollId);
				return Ok(result);
			}

			return Problem("Session is not active");
		}

		[HttpGet("quizResult")]
		public async Task<IActionResult> GetVoteResultForQuiz([FromQuery] Guid sessionId, int pollOrder,[FromQuery] bool closeActivePoll = true)
		{
			var results = new List<VoteResultDTO>();
			var session = await _sessionService.Get(sessionId);

			if (session is not null)
			{
				session.ShowResultPoll = new List<Guid>();

				var pollCollection = await _pollCollectionService.Get(session.PollCollectionId);

				foreach (var poll in pollCollection.Polls)
				{
					if (poll.OrderNumber > pollOrder)
						break;
					else
					{
						session.ShowResultPoll.Add(poll.Id);
						var result = await _voteRecordService.GetVoteResult(sessionId, poll.Id);
						if (result is not null)
							results.Add(result);
					}
				}

				if (closeActivePoll)
					session.ActivePollId = null;

				await _sessionService.Update(session);
				return Ok(results);
			}
			return Problem("Session is not active");
		}

		[HttpPut]
		public async Task<IActionResult> AddVote(VoteRecordDTO voteRecordDTO)
		{
			var result = await _voteRecordService.AddVoteRecord(voteRecordDTO);
			return Ok(result);
		}


		[HttpGet("Excel")]
		public async Task<FileResult> ExportExcel(Guid sessionId)
		{
			var voteresults = await _voteRecordService.GetVotesBySessionId(sessionId);

			DataTable dt = new DataTable("VoteResult");
			dt.Columns.AddRange(new DataColumn[3] { new DataColumn("Question"),
				new DataColumn("Participant"), new DataColumn("Chosen Option")});

			foreach (var vote in voteresults)
			{
				dt.Rows.Add(vote.Option.Poll.Name, vote.ParticipantName, vote.Option.Name);
			}
			//using ClosedXML.Excel;
			using (XLWorkbook wb = new XLWorkbook())
			{
				wb.Worksheets.Add(dt);
				using (MemoryStream stream = new MemoryStream())
				{
					wb.SaveAs(stream);
					//	wb.SaveAs("Report.xlsx");
					return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "VoteResult.xlsx");
				}
			}
		}
	}
}
