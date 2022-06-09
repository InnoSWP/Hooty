using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class PollCollectionController:Controller
	{
		private readonly IPollService _pollService;
		private readonly IPollCollectionService _pollCollectionService;
		private readonly IDBRepository _db;

		public PollCollectionController(IPollService pollService, IPollCollectionService pollCollectionService, IDBRepository db)
		{
			_pollService = pollService;
			_pollCollectionService = pollCollectionService;
			_db = db;
		}
		[HttpPost]
		public async Task<IActionResult> Create(PollCollectionDTO pollCollectionDTO)
		{
			return Ok(await _pollCollectionService.Create(pollCollectionDTO));
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
	}
}
