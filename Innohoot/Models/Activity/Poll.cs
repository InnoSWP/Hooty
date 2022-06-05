using Innohoot.Models.Identity;

namespace Innohoot.Models.Activity
{
	public class Poll : IEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }
		public Guid UserId { get; set; }
		public User User { get; set; }
		public List<Option> Options { get; set; } 
	}
}
