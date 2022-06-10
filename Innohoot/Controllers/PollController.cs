﻿using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Innohoot.Models.Activity;
using Microsoft.AspNetCore.Mvc;

namespace Innohoot.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class PollController:Controller
	{
		private readonly IPollService _pollService;
		private readonly ISessionService _sessionService;
		private readonly IDBRepository _db;

		public PollController(IPollService pollService, ISessionService sessionService, IDBRepository db)
		{
			_pollService = pollService;
			_sessionService = sessionService;
			_db = db;
		}
		[HttpPost]
		public async Task<IActionResult> Create(PollDTO pollDTO)
		{
			return Ok(await _pollService.Create(pollDTO));
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