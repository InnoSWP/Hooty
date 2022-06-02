namespace Innohoot.Models.Activity
{
	public class Poll : IEntity
	{
		public Guid UserId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public List<Option> Options { get; set; }
		public Guid Id { get; set; }
	}
}
