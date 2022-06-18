using Innohoot.DataLayer;
using Innohoot.DataLayer.Services.Implementations;
using Innohoot.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Innohoot.Controllers
{
	[Route("[controller]s")]
	[ApiController]
	public class OptionController : Controller
	{
		private readonly IOptionService _optionService;

		public OptionController(IOptionService optionService)
		{
			_optionService = optionService;
		}

		[HttpPost]
		public async Task<IActionResult> Create(OptionDTO optionDto)
		{
			return Ok(await _optionService.Create(optionDto));
		}
	}
}
