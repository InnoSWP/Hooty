using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace Innohoot.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class PollCollectionsController:Controller
	{
		private readonly IPollService _pollService;
		private readonly IPollCollectionService _pollCollectionService;
		private readonly IDBRepository _db;

		public PollCollectionsController(IPollService pollService, IPollCollectionService pollCollectionService, IDBRepository db)
		{
			_pollService = pollService;
			_pollCollectionService = pollCollectionService;
			_db = db;
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
		[HttpGet]
		public async Task<IActionResult> GetAllPollsByPollCollectionId(Guid Id)
		{
			return Ok(await _pollService.GetAllPollsByPollCollectionId(Id));
		}
	}
}
