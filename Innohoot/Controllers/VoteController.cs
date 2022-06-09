using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices;
using Innohoot.DataLayer;
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
	[ApiController]
	public class VoteController : Controller
	{
		private readonly IPollService _pollService;
		private readonly ISessionService _sessionService;
		private readonly IDBRepository _db;
		public VoteController(IPollService pollService, ISessionService sessionService, IDBRepository context)
		{
			_pollService = pollService;
			_sessionService = sessionService;
			_db = context;
		}
/*
		[HttpPut]
		public async Task<IActionResult> AddVoteRecord(VoteRecord voteRecord)
		{
			var session = voteRecord.ChosenOption.Poll.User.Sessions.FirstOrDefault(x => x.Available);
			if (session == null)
			{
				var transaction = await _db.BeginTransaction();  
				try
				{
					session.VoteRecords.Add(voteRecord);
					_sessionService.Update(session);
					/// _voteRecordService.Add(voteRecord);
					transaction.Commit();
					return Ok();
				}
				catch (Exception ex)
				{
					transaction.Rollback();
					return Problem("Can not save vote record");
				}
			}
			return Problem("Such session is not available now or even do not exist");
		}

		[HttpGet]
		public async Task<IActionResult> GetVoteRecords([NotNull] Guid sessionId, [NotNull] Guid pollId)
		{
			var session = await _sessionService.Get(sessionId);
			var poll = await _pollService.Get(pollId);

			//take all records about given poll-question
			var voteRecords =  session.VoteRecords.Where(x => x.ChosenOption.PollId.Equals(pollId));

			Dictionary<Option, int> result = new();
			foreach (var option in poll.Options)
			{
				int number = voteRecords.Where(x => x.ChosenOption.Id.Equals(option.Id)).ToList().Capacity;
				result[option] = number;
			}

			//return new JsonResult(JsonConvert.SerializeObject(result));
			return new JsonResult(result);
		}*/
	}
}
