using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	public class PollCollectionController : Controller
	{
		private readonly IPollService _pollService;
		private readonly IPollCollectionService _pollCollectionService;

		public PollCollectionController(IPollService pollService, IPollCollectionService pollCollectionService, IDBRepository db)
		{
			_pollService = pollService;
			_pollCollectionService = pollCollectionService;
		}
		[HttpGet]
		public async Task<IActionResult> Get(Guid Id)
		{
			return Ok(await _pollCollectionService.Get(Id));
		}
		[HttpPost]
		public async Task<IActionResult> Create(PollCollectionDTO pollCollectionDTO)
		{
			return Ok(await _pollCollectionService.Create(pollCollectionDTO));
		}
		[HttpPut]
		public async Task<IActionResult> Update(PollCollectionDTO pollCollectionDTO)
		{
			await _pollCollectionService.Update(pollCollectionDTO);
			return NoContent();
		}

		[HttpDelete]
		public async Task<IActionResult> Delete(Guid Id)
		{
			await _pollCollectionService.Delete(Id);
			return NoContent();
		}
		[HttpGet("Polls")]
		public async Task<IActionResult> GetAllPollsByPollCollectionId(Guid Id)
		{
			return Ok(await _pollService.GetAllPollsByPollCollectionId(Id));
		}

		[HttpPatch("{Id}")]
		public async Task<IActionResult> Update([FromRoute] Guid Id, [FromBody] JsonPatchDocument pollCollectionJsonPatchDocument)
		{
			await _pollCollectionService.UpdatePatch(Id, pollCollectionJsonPatchDocument);
			return NoContent();
		}
	}
}
