using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using ClosedXML.Excel;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	public class VoteController : Controller
	{
		private readonly IPollService _pollService;
		private readonly ISessionService _sessionService;
		private readonly IVoteRecordService _voteRecordService;

		public VoteController(IPollService pollService, ISessionService sessionService, IVoteRecordService voteRecordService)
		{
			_pollService = pollService;
			_sessionService = sessionService;
			_voteRecordService = voteRecordService;
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
			var result = await _voteRecordService.AddVoteRecord(voteRecordDTO);
			return Ok(result);
		}


		[HttpGet("Excel")]
		public async Task<FileResult> ExportExcel(Guid sessionId)
		{
			var voteresults = await _voteRecordService.GiveVotesBySessionId(sessionId);

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
