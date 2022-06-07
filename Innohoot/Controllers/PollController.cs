using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
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

		
	}
}
