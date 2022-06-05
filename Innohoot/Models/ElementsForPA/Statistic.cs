using Innohoot.Models.Activity;

namespace Innohoot.Models.ElementsForPA
{
	public class Statistic
	{
		public Guid UserId { get; set; }
		public string Name { get; set; }
		public DateTime Created { get; set; }
		public DateTime StarTime { get; set; }
		public string Description { get; set; }
		public List<Poll> Polls { get; set; }
		public bool Available { get; set; } = false;
		public Guid Id { get; set; }
	}
}
