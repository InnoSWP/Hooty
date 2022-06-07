using Innohoot.Models.Activity;
using Innohoot.Models.Identity;

namespace Innohoot.Models.ElementsForPA
{
	public class PollCollection
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public User User{ get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }
		public DateTime Created { get; set; }
		public List<Poll> Polls { get; set; }
	}
}
