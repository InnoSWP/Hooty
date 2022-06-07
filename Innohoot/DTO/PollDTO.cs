using Innohoot.Models.Activity;
using Innohoot.Models.Identity;

namespace Innohoot.DTO
{
	public class PollDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }
		public Guid UserId { get; set; }

	}
}
