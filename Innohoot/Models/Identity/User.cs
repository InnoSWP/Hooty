using Innohoot.Models.Activity;

namespace Innohoot.Models.Identity
{
	public class User : IEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public List<Session> Sessions { get; set; }
	}
}
